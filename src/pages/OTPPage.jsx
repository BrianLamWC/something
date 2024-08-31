import OTPForm from "@/components/OTPForm";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";


const OTPPage = () => {

    const { accessToken } = useParams();
    const { token } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
          navigate('/', { replace: true });
        }
    }, [navigate, token]);

    return(
        <>
        <div className="pt-10 text-center text-white">
            <h2>Input the OTP displayed in the authenticator app</h2>
        </div>
        <div className="mt-10 ">
            <OTPForm accessToken={accessToken}/>
        </div>
        </>

      );
}

export default OTPPage