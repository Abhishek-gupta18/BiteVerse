import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user, isLoading } = useAuth();
  const location = useLocation();

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
        Checking session...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (user.verification_status !== 'verified') {
    return <Navigate to="/pending-verification" replace state={{ from: location }} />;
  }

  return children;
}
