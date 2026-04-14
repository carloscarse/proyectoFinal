// frontEnd/src/routes/ProtectedRoute.jsx
import { useUserStore } from "../Stores/userStore";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useUserStore();

  // Si no hay usuario logueado, redirige al login
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Para que todos entren y Sidebar muestre lo permitido:
  return children;
};

export default ProtectedRoute;