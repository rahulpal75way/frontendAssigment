import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const useRoleRedirect = () => {
  const user = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "admin") {
      navigate("/admin/dashboard");
    } else if (user?.role === "user") {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, [user, navigate]);
};

export default useRoleRedirect;
