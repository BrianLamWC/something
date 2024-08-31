import axios from 'axios';
import { createContext, useContext, useEffect, useState, useLayoutEffect } from 'react';
import config from '@/config';


const AuthContext = createContext(undefined);

axios.defaults.withCredentials = true;

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return authContext;
};

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState();

  useEffect(() => {

    const fetchMe = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/me`, { withCredentials: true,});
        setToken(response.data.token);
      } catch { 
        setToken(null);
      }
    };

    fetchMe();
  }, []);

  useLayoutEffect(() => {
    const authInterceptor = axios.interceptors.request.use((config) => {
      config.headers.Authorization = !config._retry && token
        ? token
        : config.headers.Authorization;
      return config;
    });

    return () => {
      axios.interceptors.request.eject(authInterceptor);
    };
  }, [token]);

  useLayoutEffect(() => {
    const refreshInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (
          error.response.status === 403 &&
          error.response.data.error === 'permission denied'
        ) {
          try {
            const response = await axios.get(`${config.apiUrl}/refreshToken`, {withCredentials: true});

            setToken(response.data.token);

            originalRequest.headers.Authorization = response.data.token;
            originalRequest._retry = true;

            return axios(originalRequest);
          } catch {
            setToken(null);
          }
        }

        return Promise.reject(error);
      },
    );

    return () => {
      axios.interceptors.response.eject(refreshInterceptor);
    };
  }, []);


  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;