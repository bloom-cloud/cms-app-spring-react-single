import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoutes = ({ children }: { children: JSX.Element }) => {
  const { token } = useAuth();

  if (!token) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoutes;
