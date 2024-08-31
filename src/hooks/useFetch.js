import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

const useFetch = (url, options) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const abortControllerRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            setError(null);
            setIsLoading(true);
      
            abortControllerRef.current = new AbortController();

            try {
                
                const response = await axios.get(url, {
                    params:{
                        ...options,
                    },
                    signal: abortControllerRef.current?.signal,
                });
                setData(response.data)

            } catch (error) {
                
                if (axios.isCancel(error)) {
                    return;
                }
          
                setError('Something went wrong. Please try again later.');
            } finally{
                setIsLoading(false)
            }
        };

        fetchData();

        return () => {
            abortControllerRef.current?.abort();
        };
    }, [options, url]);

    return { data, error, isLoading };

};

export default useFetch