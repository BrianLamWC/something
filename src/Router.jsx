import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from '@/pages/HomePage';
import ServicePage from './pages/ServicePage';
import SignInPage from './pages/SignInPage';
import Route from './components/Route';
import OTPPage from './pages/OTPPage';
import NotFoundPage from './pages/NotFoundPage';

import App from '@/App';

const router = createBrowserRouter([
    {
        path:'/',
        element: <App />,
        errorElement: <NotFoundPage />,
        children: [
            {
                path: '/signin',
                element: (
                    <Route>
                        <SignInPage />
                    </Route>
                    
                )
            },
            {
                path: '/',
                element: (
                    <Route isProtected>
                        <HomePage />
                    </Route>
                    
                )
            },
            {
                path: '/services/:serviceName',
                element: (
                    <Route isProtected>
                        <ServicePage />
                    </Route>
                )
            },
            {
                path: '/OTP/:accessToken',
                element: (
                    <Route>
                        <OTPPage />
                    </Route>
                )
            },

        ],
    }
]);

const Router = () => <RouterProvider router={router} />;

export default Router;