import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useAuth } from './AuthProvider';
import axios from 'axios';

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"

import { Button } from "@/components/ui/button"

const OTPFormSchema = z.object({
    otp: z.string().min(6, {message : "OTP must be 6 digits"})
});

const OTPForm = ( { accessToken }) => {

    const { setToken } = useAuth();

    const {
        formState: { errors, isSubmitting },
        handleSubmit,
        register,
        setError
    } = useForm({ resolver: zodResolver(OTPFormSchema)});

    const onSubmit = async (data) => {
        try {

            await axios.post(
                "http://localhost:3333/api/v1/otp",
                data,
                {
                  headers: {
                    Authorization: accessToken,
                  },
                }
            );

            setToken(accessToken)
    
        } catch {
          setError("root", {
            message: "Invalid OTP",
          });
        }
    };

    return(
        <form >
            <div >
                <InputOTP maxLength={6} {...register('otp')}>
                    <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                    </InputOTPGroup>
                </InputOTP>

            </div>

            <div className='min-h-[20px] mt-5'>
                {errors['otp'] && (
                    <div className='text-sm text-red-500 text-center bg-black'>
                        {errors['otp'].message}
                    </div>
                )}
                {errors.root && (

                    <div className="text-sm text-red-500 text-center">
                        {errors.root.message}
                    </div>
                )}
            </div>
            
            <div className='flex flex-col items-center pt-5'>
                <Button className='border bg-black hover:bg-white hover:text-black' disabled={isSubmitting} onClick={handleSubmit(onSubmit)}>
                    {isSubmitting ? 'Loading...' : 'Submit OTP'}
                </Button>
            </div>



        </form>

    );
}

export default OTPForm