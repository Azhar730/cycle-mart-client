import Button from "@/components/Button/Button";
import ShopForm from "@/components/Form/ShopForm";
import ShopInput from "@/components/Form/ShopInput";
import {
  useLoginMutation,
  useRegisterMutation,
} from "@/Redux/features/auth/authApi";
import { setUser } from "@/Redux/features/auth/authSlice";
import { useAppDispatch } from "@/Redux/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const validationSchema = z.object({
  name: z.string({
    required_error: "Name is required",
  }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email address"),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(8, "Password must be at least 8 characters long"),
});

const Register = () => {
  const [register] = useRegisterMutation();
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (formData: FieldValues) => {
    console.log(formData);
    const toastId = toast.loading("Creating an account");
    try {
      const res = await register(formData).unwrap();
      console.log(res);
      if (res.success) {
        toast.success(res.message, { id: toastId });
        const loginRes = await login({
          email: formData.email,
          password: formData.password,
        }).unwrap();
        console.log(loginRes);
        console.log('register',loginRes.data.id);
        dispatch(
          setUser({
            user: {
              id: loginRes.data.id,
              name: loginRes.data.name,
              email: loginRes.data.email,
              role: loginRes.data.role,
            },
            token: loginRes.token,
          })
        );
        navigate("/");
      }
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong", { id: toastId });
    }
  };
  return (
    <div className="min-h-[calc(100vh-57px)] flex items-center justify-center bg-transparent">
      <div className="w-full max-w-lg space-y-8 p-2 xs:p-6">
        <div className="text-center space-y-2">
          <h1 className="text-xl md:text-3xl font-bold tracking-tight text-primary">
            Register Now
          </h1>
        </div>

        <div className="bg-white p-3 xs:p-6 rounded-lg shadow-lg border border-gray-300">
          <ShopForm
            className=""
            onSubmit={handleSubmit}
            resolver={zodResolver(validationSchema)}
          >
            <div className="w-full">
              <ShopInput
                type="text"
                name={"name"}
                label="Name"
                placeHolder="Enter your name"
              />
            </div>
            <div className="w-full">
              <ShopInput
                name={"email"}
                label="Email"
                type="email"
                placeHolder="Enter your email"
              />
            </div>
            <div className="w-full">
              <ShopInput
                name={"password"}
                label="Password"
                placeHolder="Enter your Password"
                type="text"
              />
            </div>
            <div className="-mt-2 md:mt-0 w-full">
              <Button text="Sign up" isFullWidth={true} />
            </div>
          </ShopForm>
        </div>

        <p className="text-center text-sm text-gray-600">
          Already have an account?
          <Link
            to="/login"
            className="font-medium text-primary hover:text-primary ms-1"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
