import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


import { useAuth } from "@/components/AuthProvider";
import SignInForm from "@/components/SignInForm";

const SignInPage = () => {
    const { token } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
          navigate('/', { replace: true });
        }
    }, [navigate, token]);

    return(
        <div className="p-4">
            <SignInForm />
        </div>
    );
};

export default SignInPage