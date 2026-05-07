import React, { useEffect, useState } from 'react';

/**
 * Leaderboard
 * Props:
 *  - apiUrl: string (endpoint returning an array of { id?, name, points })
 *  - limit: number
 */
const Leaderboard = ({ apiUrl = '/api/leaderboard', limit = 10 }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText || 'Failed to fetch');
        return res.json();
      })
      .then((data) => {
        if (!mounted) return;
        setItems(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err.message || 'Error');
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [apiUrl]);

  return (
    <div className="leaderboard" style={{ maxWidth: 360 }}>
      <h3 style={{ margin: '0 0 8px' }}>Leaderboard</h3>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: 'var(--danger, #b00020)' }}>Error: {error}</p>
      ) : (
        <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {items.slice(0, limit).map((user, idx) => (
            <li
              key={user.id ?? user.name ?? idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '8px 6px',
                borderBottom: '1px solid rgba(0,0,0,0.06)'
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  background: 'linear-gradient(135deg,#4f46e5,#06b6d4)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  marginRight: 10,
                }}
              >
                {idx + 1}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: 14 }}>
                  {user.name ?? user.username ?? 'Unknown'}
                </div>
                <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.6)' }}>
                  {user.points ?? user.score ?? 0} pts
                </div>
              </div>
            </li>
          ))}
          {items.length === 0 && <li style={{ padding: 8 }}>No entries yet.</li>}
        </ol>
      )}
    </div>
  );
};

export default Leaderboard;
