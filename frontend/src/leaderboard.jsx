import React, { useEffect, useState } from 'react';

/**
 * Leaderboard
 * Props:
 *  - apiUrl: string (endpoint returning an array of { id?, name, points })
 *  - limit: number
 *  - data: array (optional mock data to display instead of fetching)
 */
const Leaderboard = ({ apiUrl = '/api/leaderboard', limit = 10, data }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (data) {
      // Use provided mock data
      setItems(Array.isArray(data) ? data : []);
      setLoading(false);
      return;
    }

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
  }, [apiUrl, data]);

  return (
    <div className="leaderboard">
      <h3>Leaderboard</h3>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: 'var(--danger, #b00020)' }}>Error: {error}</p>
      ) : (
        <ol className="leaderboard-list">
          {items.slice(0, limit).map((user, idx) => (
            <li key={user.id ?? user.name ?? idx} className={`leaderboard-item ${idx < 3 ? 'podium' : ''}`}>
              <div className={`leader-rank ${idx < 3 ? `podium-${idx + 1}` : ''}`} aria-hidden>
                {user.avatar ? (
                  <img src={user.avatar} alt="avatar" className="leader-avatar" />
                ) : (
                  <span className="rank-number">{idx + 1}</span>
                )}
              </div>

              <div className="leader-meta">
                <div className="leader-name">{user.name ?? user.username ?? 'Unknown'}</div>
                <div className="leader-points">{user.points ?? user.score ?? 0} pts</div>
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
