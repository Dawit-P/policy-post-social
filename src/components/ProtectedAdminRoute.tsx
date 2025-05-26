
import { Navigate } from 'react-router-dom';

interface ProtectedAdminRouteProps {
  children: React.ReactNode;
}

const ProtectedAdminRoute = ({ children }: ProtectedAdminRouteProps) => {
  // Mock admin check - in real app, this would check user role from auth context
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isAdmin = user?.role === 'admin' || user?.email?.includes('admin'); // Mock logic
  
  if (!isAdmin) {
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
};

export default ProtectedAdminRoute;
