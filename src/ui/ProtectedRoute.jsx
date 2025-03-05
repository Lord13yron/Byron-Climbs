import { Navigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useUser();

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return children;
}

export default ProtectedRoute;
