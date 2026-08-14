import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const API_BASE = 'http://localhost:5000/api';

export default function AddReview() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [foodId, setFoodId] = useState('');
  const [rating, setRating] = useState('5');
  const [reviewText, setReviewText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!foodId) {
      setError('Food item ID is required.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/reviews`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          food_id: Number(foodId),
          rating: Number(rating),
          review_text: reviewText || null,
          image_url: imageUrl || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create review');
      }

      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to create review');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ minHeight: '100vh', background: '#020617', color: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: 540, background: 'rgba(15, 23, 42, 0.85)', border: '1px solid rgba(148, 163, 184, 0.2)', borderRadius: 18, padding: '2rem' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <p style={{ margin: 0, color: '#a5f3fc', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: 12 }}>Add review</p>
          <h1 style={{ margin: '0.5rem 0 0', fontSize: '2rem' }}>Share your BiteVerse take</h1>
        </div>

        {error && (
          <div style={{ marginBottom: '1rem', padding: '0.8rem 1rem', borderRadius: 10, background: 'rgba(239, 68, 68, 0.12)', color: '#fecaca' }}>
            {error}
          </div>
        )}

        <label style={{ display: 'block', marginBottom: '1rem' }}>
          <span style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Food item ID</span>
          <input
            value={foodId}
            onChange={(event) => setFoodId(event.target.value)}
            type="number"
            min="1"
            placeholder="Example: 12"
            style={{ width: '100%', padding: '0.9rem 1rem', borderRadius: 10, border: '1px solid rgba(148, 163, 184, 0.3)', background: '#0f172a', color: '#f8fafc' }}
          />
        </label>

        <label style={{ display: 'block', marginBottom: '1rem' }}>
          <span style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Rating</span>
          <select
            value={rating}
            onChange={(event) => setRating(event.target.value)}
            style={{ width: '100%', padding: '0.9rem 1rem', borderRadius: 10, border: '1px solid rgba(148, 163, 184, 0.3)', background: '#0f172a', color: '#f8fafc' }}
          >
            {[5, 4, 3, 2, 1].map((value) => (
              <option key={value} value={value}>{value} / 5</option>
            ))}
          </select>
        </label>

        <label style={{ display: 'block', marginBottom: '1rem' }}>
          <span style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Review text</span>
          <textarea
            value={reviewText}
            onChange={(event) => setReviewText(event.target.value)}
            rows={5}
            placeholder="Tell the campus what made it worth it..."
            style={{ width: '100%', resize: 'vertical', padding: '0.9rem 1rem', borderRadius: 10, border: '1px solid rgba(148, 163, 184, 0.3)', background: '#0f172a', color: '#f8fafc' }}
          />
        </label>

        <label style={{ display: 'block', marginBottom: '1.5rem' }}>
          <span style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Image URL (optional)</span>
          <input
            value={imageUrl}
            onChange={(event) => setImageUrl(event.target.value)}
            type="url"
            placeholder="https://..."
            style={{ width: '100%', padding: '0.9rem 1rem', borderRadius: 10, border: '1px solid rgba(148, 163, 184, 0.3)', background: '#0f172a', color: '#f8fafc' }}
          />
        </label>

        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
          <button type="button" onClick={() => navigate('/dashboard')} style={{ padding: '0.9rem 1.2rem', borderRadius: 10, border: '1px solid rgba(148, 163, 184, 0.3)', background: 'transparent', color: '#e2e8f0', cursor: 'pointer' }}>
            Cancel
          </button>
          <button type="submit" disabled={loading} style={{ padding: '0.9rem 1.2rem', borderRadius: 10, border: 'none', background: 'linear-gradient(135deg, #f59e0b, #f97316)', color: '#fff', fontWeight: 700, cursor: 'pointer', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Submitting...' : 'Submit review'}
          </button>
        </div>
      </form>
    </main>
  );
}
