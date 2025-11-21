import { useUserStore } from '../Store/userStore';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { user } = useUserStore();

  if (!user || user.rol !== 'admin') {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;