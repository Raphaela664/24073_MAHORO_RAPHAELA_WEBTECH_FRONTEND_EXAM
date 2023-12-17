import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
  

    if (localStorage.getItem("role")) {
      const role = localStorage.getItem("role");
      
        if (role === "ADMIN") {
          navigate("/admin/dashboard");
        }
        if (role === "LECTURER") {
          navigate("/lecturer/dashboard");
        }
        if (role === "STUDENT") {
          navigate("/student/dashboard");
        }
    } else {
      navigate("/", { replace: true });
    }
  }, []);

  return children;
};

export default PrivateRoutes;
