import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import config from "@/config";

const signInFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const SignInForm = () => {
  const navigate = useNavigate();

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    setError,
  } = useForm({ resolver: zodResolver(signInFormSchema) });

  const onSubmit = async (data) => {
    try {
    	const response = await axios.post(`${config.apiUrl}/signin`,data);

		navigate(`/OTP/${response.data.token}`, { replace: true });

    } catch (e) {
      setError("root", {
        message: e.response.data.message,
      });
    }
  };

  return (
    <Card className="mx-auto w-[500px] bg-black">
      <CardHeader>
        <h2 className="text-center text-2xl text-white pb-4">sign in</h2>
        <Separator className="bg-slate-200" />
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4 pt-2">
          <div>
            <Input {...register("email")} placeholder="name@example.com" />
            {errors["email"] && (
              <div className="mt-2 text-sm text-red-500">
                {errors["email"].message}
              </div>
            )}
          </div>

          <div>
            <Input {...register("password")} type="password" />
            {errors["password"] && (
              <div className="mt-2 text-sm text-red-500">
                {errors["password"].message}
              </div>
            )}
          </div>

          <div className="flex flex-col items-center">
            <Button
              className="border bg-black w-1/2 hover:bg-white hover:text-black"
              disabled={isSubmitting}
              onClick={handleSubmit(onSubmit)}
            >
              {isSubmitting ? "Loading..." : "Sign In"}
            </Button>
          </div>

          {errors.root && (
            <div className="text-center text-sm text-red-500">
              {errors.root.message}
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default SignInForm;
