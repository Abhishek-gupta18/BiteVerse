import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const API_BASE = 'http://localhost:5000/api';

export default function AddStall() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [form, setForm] = useState({
    name: '',
    food_court: '',
    location: '',
    description: '',
    image_url: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!form.name || !user?.college_id) {
      setError('Stall name and college are required.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/stalls`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          college_id: user.college_id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create stall');
      }

      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to create stall');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ minHeight: '100vh', background: '#020617', color: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: 540, background: 'rgba(15, 23, 42, 0.85)', border: '1px solid rgba(148, 163, 184, 0.2)', borderRadius: 18, padding: '2rem' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <p style={{ margin: 0, color: '#a5f3fc', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: 12 }}>Add stall</p>
          <h1 style={{ margin: '0.5rem 0 0', fontSize: '2rem' }}>Register a new campus stall</h1>
        </div>

        {error && (
          <div style={{ marginBottom: '1rem', padding: '0.8rem 1rem', borderRadius: 10, background: 'rgba(239, 68, 68, 0.12)', color: '#fecaca' }}>
            {error}
          </div>
        )}

        <label style={{ display: 'block', marginBottom: '1rem' }}>
          <span style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Stall name</span>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            type="text"
            placeholder="Moonlight Bites"
            style={{ width: '100%', padding: '0.9rem 1rem', borderRadius: 10, border: '1px solid rgba(148, 163, 184, 0.3)', background: '#0f172a', color: '#f8fafc' }}
          />
        </label>

        <label style={{ display: 'block', marginBottom: '1rem' }}>
          <span style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Food court</span>
          <input
            name="food_court"
            value={form.food_court}
            onChange={handleChange}
            type="text"
            placeholder="North Food Court"
            style={{ width: '100%', padding: '0.9rem 1rem', borderRadius: 10, border: '1px solid rgba(148, 163, 184, 0.3)', background: '#0f172a', color: '#f8fafc' }}
          />
        </label>

        <label style={{ display: 'block', marginBottom: '1rem' }}>
          <span style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Location</span>
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            type="text"
            placeholder="Near library gate"
            style={{ width: '100%', padding: '0.9rem 1rem', borderRadius: 10, border: '1px solid rgba(148, 163, 184, 0.3)', background: '#0f172a', color: '#f8fafc' }}
          />
        </label>

        <label style={{ display: 'block', marginBottom: '1rem' }}>
          <span style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Description</span>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            placeholder="What makes this stall special?"
            style={{ width: '100%', resize: 'vertical', padding: '0.9rem 1rem', borderRadius: 10, border: '1px solid rgba(148, 163, 184, 0.3)', background: '#0f172a', color: '#f8fafc' }}
          />
        </label>

        <label style={{ display: 'block', marginBottom: '1.5rem' }}>
          <span style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Image URL (optional)</span>
          <input
            name="image_url"
            value={form.image_url}
            onChange={handleChange}
            type="url"
            placeholder="https://..."
            style={{ width: '100%', padding: '0.9rem 1rem', borderRadius: 10, border: '1px solid rgba(148, 163, 184, 0.3)', background: '#0f172a', color: '#f8fafc' }}
          />
        </label>

        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
          <button type="button" onClick={() => navigate('/dashboard')} style={{ padding: '0.9rem 1.2rem', borderRadius: 10, border: '1px solid rgba(148, 163, 184, 0.3)', background: 'transparent', color: '#e2e8f0', cursor: 'pointer' }}>
            Cancel
          </button>
          <button type="submit" disabled={loading} style={{ padding: '0.9rem 1.2rem', borderRadius: 10, border: 'none', background: 'linear-gradient(135deg, #22c55e, #16a34a)', color: '#fff', fontWeight: 700, cursor: 'pointer', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Submitting...' : 'Create stall'}
          </button>
        </div>
      </form>
    </main>
  );
}
