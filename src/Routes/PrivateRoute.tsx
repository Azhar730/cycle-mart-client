import Loading from "@/components/Loading";
import { selectCurrentToken } from "@/Redux/features/auth/authSlice";
import { useAppSelector } from "@/Redux/hooks";
import { useState, useEffect } from "react";

import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const token = useAppSelector(selectCurrentToken);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      setLoading(false);
    }
  }, [token, navigate]);

  if (loading) {
    return <Loading />;
  }

  return children;
};

export default PrivateRoute;
