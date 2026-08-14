import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

export default function PendingVerification() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const isRejected = user?.verification_status === 'rejected';

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #020617 0%, #0f172a 50%, #111827 100%)',
      color: '#f8fafc',
      fontFamily: 'Inter, sans-serif',
      padding: '2rem',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '520px',
        background: 'rgba(15, 23, 42, 0.8)',
        border: '1px solid rgba(148, 163, 184, 0.2)',
        borderRadius: '20px',
        padding: '2rem',
        boxShadow: '0 20px 40px rgba(15, 23, 42, 0.45)',
      }}>
        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>
          {isRejected ? '⚠️' : '⏳'}
        </div>

        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
          {isRejected ? 'ID verification rejected' : 'Your account is under review'}
        </h1>

        <p style={{ fontSize: '1rem', lineHeight: 1.7, color: '#cbd5e1', marginBottom: '1.5rem' }}>
          {isRejected
            ? (user?.rejection_reason || 'Your ID verification was rejected. Please contact support or re-upload a valid ID card.')
            : 'Your account is pending admin approval. You will be able to access the platform once your ID verification is approved.'}
        </p>

        <button
          type="button"
          onClick={handleLogout}
          style={{
            width: '100%',
            border: 'none',
            borderRadius: '12px',
            padding: '0.9rem 1rem',
            fontSize: '1rem',
            fontWeight: 700,
            background: 'linear-gradient(90deg, #f97316, #ef4444)',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          Log out
        </button>
      </div>
    </main>
  );
}
