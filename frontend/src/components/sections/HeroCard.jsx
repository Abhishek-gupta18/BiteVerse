import React from "react";
import "../../styles/HeroCard.css";

const HeroCard = ({ stats, userData }) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="hero-card">
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">{getGreeting()}, Food Explorer! 👋</h1>
          <p className="hero-subtitle">
            You've explored {stats.totalReviews} campus dining experiences. Your taste buds are making history.
          </p>
        </div>
        <button className="hero-cta">Explore More →</button>
      </div>

      <div className="hero-stats">
        <div className="stat-item">
          <div className="stat-number">{stats.totalReviews}</div>
          <div className="stat-label">Total Reviews</div>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <div className="stat-number">{stats.averageRating}</div>
          <div className="stat-label">Avg Rating Given</div>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <div className="stat-number">{stats.pointsEarned}</div>
          <div className="stat-label">Points Earned</div>
        </div>
      </div>
    </div>
  );
};

export default HeroCard;
