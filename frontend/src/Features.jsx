import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { triggerPageTransition } from './Transition';
import './styles/Features.css';

export default function Features() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');

  const allFeatures = [
    {
      id: 1,
      category: 'discovery',
      title: 'Smart Food Discovery',
      icon: '🔍',
      description: 'Find the best food stalls and dishes tailored to your taste',
      details: [
        'AI-powered recommendations based on your taste profile',
        'Real-time availability updates from stalls',
        'Filter by cuisine, price, dietary preferences',
        'Discover trending dishes on campus'
      ],
      color: '#06B6D4'
    },
    {
      id: 2,
      category: 'community',
      title: 'Community Reviews & Ratings',
      icon: '⭐',
      description: 'Share and read authentic reviews from fellow food explorers',
      details: [
        'Detailed photo reviews with ratings',
        'Build reviewer credibility through accuracy scores',
        'Community voting on review helpfulness',
        'Badges for verified purchases and reviews'
      ],
      color: '#F59E0B'
    },
    {
      id: 3,
      category: 'rewards',
      title: 'Rewards & Loyalty Program',
      icon: '🏆',
      description: 'Earn points for every interaction and redeem amazing rewards',
      details: [
        'Earn XP for reviews, logins, referrals',
        'Set custom reward targets and goals',
        'Redeem points for discounts and exclusive items',
        'Monthly streak bonuses for consistent engagement'
      ],
      color: '#7C3AED'
    },
    {
      id: 4,
      category: 'community',
      title: 'Live Chat & Instant Updates',
      icon: '💬',
      description: 'Chat with friends and get real-time food alerts',
      details: [
        'Chat with other users about food experiences',
        'Share stall locations and recommendations',
        'Real-time notifications for queue status',
        'Private messaging with food explorers'
      ],
      color: '#22C55E'
    },
    {
      id: 5,
      category: 'gamification',
      title: 'Gamified Leaderboards',
      icon: '🏅',
      description: 'Compete with campus explorers and climb the rankings',
      details: [
        'Weekly, monthly, and all-time leaderboards',
        'Track your XP and food explorer level',
        'Special badges for achievements',
        'Campus-wide rankings and achievements'
      ],
      color: '#EC4899'
    },
    {
      id: 6,
      category: 'discovery',
      title: 'Explore Food Page',
      icon: '🍽️',
      description: 'Browse all available stalls with advanced filtering',
      details: [
        'Dynamic filter system (budget, cuisine, ratings)',
        'Trending items and recommended feeds',
        'Quick-view outlet information',
        'Save favorite stalls and dishes'
      ],
      color: '#06B6D4'
    },
    {
      id: 7,
      category: 'auth',
      title: 'Secure Authentication',
      icon: '🔐',
      description: 'Fast and secure login with OTP verification',
      details: [
        'One-time password (OTP) verification',
        'JWT token-based secure sessions',
        'Google and email registration options',
        'Password recovery and account security'
      ],
      color: '#8B5CF6'
    },
    {
      id: 8,
      category: 'personalization',
      title: 'Smart Personalization',
      icon: '👤',
      description: 'Customize your experience with preferences and themes',
      details: [
        'Dark/Light theme switching',
        'Personalized dashboard with your stats',
        'Save dietary restrictions and preferences',
        'Custom recommendation algorithms'
      ],
      color: '#06B6D4'
    },
    {
      id: 9,
      category: 'social',
      title: 'Social Sharing',
      icon: '📱',
      description: 'Share your food discoveries with your circle',
      details: [
        'Share reviews on social media',
        'Build your food circle with friends',
        'Collaborative tasting notes',
        'Group food adventures and meetups'
      ],
      color: '#F59E0B'
    }
  ];

  const stats = [
    { number: '2.5K+', label: 'Food Creators Sharing' },
    { number: '180+', label: 'City Circles Active' },
    { number: '9', label: 'Core Features' },
    { number: '24/7', label: 'Support Available' }
  ];

  const filteredFeatures = activeTab === 'all' 
    ? allFeatures 
    : allFeatures.filter(f => f.category === activeTab);

  const categories = [
    { id: 'all', label: 'All Features', icon: '✨' },
    { id: 'discovery', label: 'Discovery', icon: '🔍' },
    { id: 'community', label: 'Community', icon: '👥' },
    { id: 'rewards', label: 'Rewards', icon: '🏆' },
    { id: 'gamification', label: 'Gamification', icon: '🎮' },
    { id: 'auth', label: 'Security', icon: '🔐' },
    { id: 'personalization', label: 'Personalization', icon: '⚙️' },
    { id: 'social', label: 'Social', icon: '📱' }
  ];

  const handleGetStarted = async () => {
    await triggerPageTransition(0, 0, { duration: 700 });
    navigate('/login');
  };

  const handleBack = async () => {
    await triggerPageTransition(0, 0, { duration: 700 });
    navigate('/');
  };

  return (
    <div className="features-container">
      {/* Header */}
      <header className="features-header">
        <div className="features-header__top">
          <button className="features-back-btn" onClick={handleBack}>
            ← Back
          </button>
          <h1>Features that make BiteVerse unique</h1>
          <p className="features-subtitle">Discover all the ways BiteVerse enhances your food journey</p>
        </div>

        {/* Stats Grid */}
        <div className="features-stats">
          {stats.map((stat, idx) => (
            <div key={idx} className="stat-card">
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </header>

      {/* Filter Tabs */}
      <div className="features-filters">
        <div className="filter-tabs">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`filter-tab ${activeTab === cat.id ? 'active' : ''}`}
              onClick={() => setActiveTab(cat.id)}
              title={cat.label}
            >
              <span className="filter-icon">{cat.icon}</span>
              <span className="filter-label">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Features Grid */}
      <div className="features-grid">
        {filteredFeatures.map((feature, idx) => (
          <div 
            key={feature.id} 
            className="feature-card"
            style={{
              '--accent-color': feature.color,
              animationDelay: `${idx * 0.08}s`
            }}
          >
            <div className="feature-icon">{feature.icon}</div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
            
            <div className="feature-details">
              <ul className="details-list">
                {feature.details.map((detail, i) => (
                  <li key={i}>
                    <span className="detail-check">✓</span>
                    <span className="detail-text">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="feature-category">{feature.category}</div>
          </div>
        ))}
      </div>

      {/* Feature Highlights */}
      <section className="feature-highlights">
        <h2>Why Choose BiteVerse?</h2>
        <div className="highlights-grid">
          <div className="highlight-item">
            <div className="highlight-number">1</div>
            <h4>Campus-Centric Design</h4>
            <p>Built specifically for college communities with campus awareness and real-time updates</p>
          </div>
          <div className="highlight-item">
            <div className="highlight-number">2</div>
            <h4>Community Driven</h4>
            <p>Every feature encourages connection, collaboration, and shared food experiences</p>
          </div>
          <div className="highlight-item">
            <div className="highlight-number">3</div>
            <h4>Gamified Engagement</h4>
            <p>Earn rewards, build streaks, and climb leaderboards for every interaction</p>
          </div>
          <div className="highlight-item">
            <div className="highlight-number">4</div>
            <h4>Secure & Fast</h4>
            <p>JWT-based authentication with OTP verification for maximum security</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="features-cta">
        <h2>Ready to explore BiteVerse?</h2>
        <p>Join thousands of food explorers discovering amazing dishes on campus</p>
        <button className="cta-button primary" onClick={handleGetStarted}>
          Get Started Now
        </button>
      </section>
    </div>
  );
}
