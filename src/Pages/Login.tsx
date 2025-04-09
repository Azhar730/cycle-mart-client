import Button from "@/components/Button/Button";
import ShopForm from "@/components/Form/ShopForm";
import ShopInput from "@/components/Form/ShopInput";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutation } from "@/Redux/features/auth/authApi";
import { useAppDispatch } from "@/Redux/hooks";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { setUser } from "@/Redux/features/auth/authSlice";

const validationSchema = z.object({
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

const Login = () => {
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (formData: FieldValues) => {
    const toastId = toast.loading("Logging in your account");
    try {
      const res = await login(formData).unwrap();
      if (res.success) {
        toast.success(res.message, { id: toastId });
        dispatch(
          setUser({
            user: {
              id: res.data.id,
              name: res.data.name,
              email: res.data.email,
              role: res.data.role,
            },
            token: res.token,
          })
        );
        navigate("/");
      }
    } catch (error: any) {
      if (error?.status === 401) {
        toast.error(error?.data?.message, { id: toastId });
        return;
      }
      toast.error(error?.data?.message || "Something went wrong", { id: toastId });
    }
  };
  return (
    <div className="min-h-[calc(100vh-57px)] flex items-center justify-center bg-transparent">
      <div className="w-full max-w-lg space-y-8 p-2 xs:p-6">
        <div className="text-center space-y-2">
          <h1 className="text-xl md:text-3xl font-bold tracking-tight text-primary">
            Login
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
              <Button type="submit" text="Login" isFullWidth={true} />
            </div>
          </ShopForm>
        </div>

        <p className="text-center text-sm text-gray-600">
          No account?
          <Link
            to="/register"
            className="font-medium text-primary hover:text-primary ms-1"
          >
           Register Now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
