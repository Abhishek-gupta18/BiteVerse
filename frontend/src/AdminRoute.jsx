import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

export default function AdminRoute({ children }) {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  const isDevAuthBypassEnabled = import.meta.env.DEV && import.meta.env.VITE_DISABLE_AUTH !== 'false';

  if (isDevAuthBypassEnabled) {
    return children;
  }

  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#020617',
        color: '#f8fafc',
        fontSize: '1.1rem',
        fontWeight: 600,
      }}>
        Checking access...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (user.role !== 'admin') {
    return <Navigate to="/dashboard" replace state={{ from: location }} />;
  }

  return children;
}
