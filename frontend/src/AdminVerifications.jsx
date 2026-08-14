import { useEffect, useState } from 'react';
import { useAuth } from './context/AuthContext';

const API_BASE = 'http://localhost:5000/api';

export default function AdminVerifications() {
  const { user } = useAuth();
  const [verifications, setVerifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [rejectingId, setRejectingId] = useState(null);
  const [rejectReason, setRejectReason] = useState('');
  const [actioningId, setActioningId] = useState(null);

  const fetchPendingVerifications = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE}/admin/verifications?status=pending`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch verification queue');
      }

      setVerifications(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'Failed to fetch verification queue');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingVerifications();
  }, []);

  const handleApprove = async (userId) => {
    setActioningId(userId);
    try {
      const response = await fetch(`${API_BASE}/admin/verifications/${userId}/approve`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Approval failed');
      }

      setVerifications((current) => current.filter((entry) => Number(entry.id) !== Number(userId)));
    } catch (err) {
      setError(err.message || 'Approval failed');
    } finally {
      setActioningId(null);
    }
  };

  const handleReject = async (userId) => {
    setActioningId(userId);
    try {
      const response = await fetch(`${API_BASE}/admin/verifications/${userId}/reject`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reason: rejectReason.trim() || null }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Rejection failed');
      }

      setVerifications((current) => current.filter((entry) => Number(entry.id) !== Number(userId)));
      setRejectingId(null);
      setRejectReason('');
    } catch (err) {
      setError(err.message || 'Rejection failed');
    } finally {
      setActioningId(null);
    }
  };

  const formatDate = (value) => {
    if (!value) return '—';
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
  };

  const getCollegeName = (collegeId) => {
    if (!collegeId) return 'N/A';
    return `College #${collegeId}`;
  };

  return (
    <main style={{
      minHeight: '100vh',
      padding: '2rem',
      background: 'linear-gradient(135deg, #020617 0%, #0f172a 50%, #111827 100%)',
      color: '#f8fafc',
      fontFamily: 'Inter, sans-serif',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <p style={{ margin: 0, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.14em', fontSize: '0.78rem' }}>
              Admin Panel
            </p>
            <h1 style={{ margin: '0.35rem 0 0', fontSize: '2.2rem' }}>Verification Queue</h1>
          </div>
          <div style={{ color: '#cbd5e1', fontSize: '0.95rem' }}>
            Signed in as {user?.full_name || user?.username || 'Admin'}
          </div>
        </div>

        {error && (
          <div style={{
            background: 'rgba(239,68,68,0.1)',
            color: '#fecaca',
            border: '1px solid rgba(239,68,68,0.4)',
            borderRadius: '12px',
            padding: '0.9rem 1rem',
            marginBottom: '1.25rem',
          }}>
            {error}
          </div>
        )}

        {loading ? (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {[1, 2, 3].map((item) => (
              <div key={item} style={{
                background: 'rgba(15, 23, 42, 0.75)',
                border: '1px solid rgba(148, 163, 184, 0.2)',
                borderRadius: '16px',
                padding: '1.25rem',
                minHeight: '180px',
                animation: 'pulse 1.5s ease-in-out infinite',
              }} />
            ))}
          </div>
        ) : verifications.length === 0 ? (
          <div style={{
            background: 'rgba(15, 23, 42, 0.75)',
            border: '1px solid rgba(148, 163, 184, 0.2)',
            borderRadius: '16px',
            padding: '2rem',
            textAlign: 'center',
            color: '#cbd5e1',
          }}>
            No pending verifications
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {verifications.map((entry) => (
              <div key={entry.id} style={{
                display: 'grid',
                gridTemplateColumns: '240px 1fr auto',
                gap: '1.25rem',
                background: 'rgba(15, 23, 42, 0.75)',
                border: '1px solid rgba(148, 163, 184, 0.2)',
                borderRadius: '16px',
                padding: '1.25rem',
              }}>
                <div>
                  {entry.id_card_url ? (
                    <a href={entry.id_card_url} target="_blank" rel="noreferrer">
                      <img
                        src={entry.id_card_url}
                        alt={`${entry.full_name} ID card`}
                        style={{
                          width: '100%',
                          height: '180px',
                          objectFit: 'cover',
                          borderRadius: '12px',
                          border: '1px solid rgba(148, 163, 184, 0.2)',
                          background: '#0f172a',
                        }}
                      />
                    </a>
                  ) : (
                    <div style={{
                      width: '100%',
                      height: '180px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: '#0f172a',
                      borderRadius: '12px',
                      color: '#94a3b8',
                    }}>
                      No ID image
                    </div>
                  )}
                </div>

                <div style={{ display: 'grid', gap: '0.8rem' }}>
                  <div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{entry.full_name}</div>
                    <div style={{ color: '#cbd5e1' }}>@{entry.username}</div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
                    <div>
                      <div style={{ color: '#94a3b8', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Email</div>
                      <div>{entry.email}</div>
                    </div>
                    <div>
                      <div style={{ color: '#94a3b8', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>College</div>
                      <div>{getCollegeName(entry.college_id)}</div>
                    </div>
                    <div>
                      <div style={{ color: '#94a3b8', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Submitted</div>
                      <div>{formatDate(entry.created_at)}</div>
                    </div>
                  </div>

                  {rejectingId === entry.id && (
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
                      <input
                        type="text"
                        value={rejectReason}
                        onChange={(e) => setRejectReason(e.target.value)}
                        placeholder="Optional rejection reason"
                        style={{
                          flex: '1 1 260px',
                          minHeight: '42px',
                          borderRadius: '10px',
                          border: '1px solid rgba(148, 163, 184, 0.25)',
                          background: '#020617',
                          color: '#f8fafc',
                          padding: '0.75rem',
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => handleReject(entry.id)}
                        disabled={actioningId === entry.id}
                        style={{
                          border: 'none',
                          borderRadius: '10px',
                          background: '#ef4444',
                          color: '#fff',
                          padding: '0.75rem 1rem',
                          fontWeight: 700,
                          cursor: actioningId === entry.id ? 'not-allowed' : 'pointer',
                          opacity: actioningId === entry.id ? 0.7 : 1,
                        }}
                      >
                        {actioningId === entry.id ? 'Rejecting...' : 'Confirm Reject'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setRejectingId(null);
                          setRejectReason('');
                        }}
                        style={{
                          border: '1px solid rgba(148, 163, 184, 0.3)',
                          borderRadius: '10px',
                          background: 'transparent',
                          color: '#f8fafc',
                          padding: '0.75rem 1rem',
                          fontWeight: 700,
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', justifyContent: 'center' }}>
                  <button
                    type="button"
                    onClick={() => handleApprove(entry.id)}
                    disabled={actioningId === entry.id}
                    style={{
                      minWidth: '120px',
                      border: 'none',
                      borderRadius: '10px',
                      background: 'linear-gradient(90deg, #10b981, #22c55e)',
                      color: '#fff',
                      padding: '0.8rem 1rem',
                      fontWeight: 700,
                      cursor: actioningId === entry.id ? 'not-allowed' : 'pointer',
                      opacity: actioningId === entry.id ? 0.7 : 1,
                    }}
                  >
                    {actioningId === entry.id ? 'Approving...' : 'Approve'}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setRejectingId(entry.id);
                      setRejectReason('');
                    }}
                    disabled={actioningId === entry.id}
                    style={{
                      minWidth: '120px',
                      border: '1px solid rgba(239, 68, 68, 0.5)',
                      borderRadius: '10px',
                      background: 'transparent',
                      color: '#fca5a5',
                      padding: '0.8rem 1rem',
                      fontWeight: 700,
                      cursor: actioningId === entry.id ? 'not-allowed' : 'pointer',
                    }}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
