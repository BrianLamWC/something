import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/');
    }, [navigate]); // Ensure navigate is only called once after the component mounts

    return null; // The component doesn't need to render anything
};

export default NotFoundPage;