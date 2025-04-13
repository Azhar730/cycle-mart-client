import { logout, selectCurrentToken, TUser } from "@/Redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { verifyToken } from "@/utils/verifyToken";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({
  children,
  role,
}: {
  children: ReactNode;
  role: string | undefined;
}) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectCurrentToken);
  let user;
  if (token) {
    user = verifyToken(token);
  }
  if (role !== undefined && role !== (user as TUser)?.role) {
    dispatch(logout());
    localStorage.removeItem("token");
    return <Navigate to="/login" replace={true} />;
  }
  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }
  return children;
};

export default ProtectedRoute;
