import { Navigate } from "react-router-dom";
import { Cookies } from "react-cookie";

const ProtectedRoute = (element, requiredRole) => {
  const cookies = new Cookies();
  const userRole = cookies.get("rol");

  if (userRole && (!requiredRole || userRole === requiredRole)) {
    return element;
  }

  // Si no cumple los requisitos, redirigir al login
  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
