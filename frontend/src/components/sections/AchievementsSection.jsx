import React from "react";
import "../../styles/AchievementsSection.css";

const AchievementsSection = ({ badges }) => {
  return (
    <div className="achievements-section">
      <h3 className="achievements-title">🏅 Your Achievements</h3>

      <div className="badges-grid">
        {badges.map((badge) => (
          <div key={badge.id} className="badge-card">
            <div className="badge-icon">{badge.icon}</div>
            <span className="badge-name">{badge.name}</span>
          </div>
        ))}
        <div className="badge-card locked">
          <div className="badge-icon">🔒</div>
          <span className="badge-name">Coming Soon</span>
        </div>
      </div>

      <button className="view-all-badges">View All Badges →</button>
    </div>
  );
};

export default AchievementsSection;
