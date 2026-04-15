import React from "react";
import "../../styles/RewardsCard.css";

const RewardsCard = ({ reward }) => {
  const progressPercentage = (reward.progress / reward.total) * 100;

  return (
    <div className="rewards-card">
      <div className="reward-header">
        <h3 className="reward-title">🎁 Next Reward</h3>
        <span className="reward-name">{reward.nextReward}</span>
      </div>

      <div className="progress-section">
        <div className="progress-bar-container">
          <div
            className="progress-bar-fill"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="progress-text">
          <span className="progress-number">
            {reward.progress} / {reward.total} pts
          </span>
          <span className="progress-remaining">
            {reward.total - reward.progress} pts to go
          </span>
        </div>
      </div>

      <div className="reward-tips">
        <p>💡 Write more reviews to earn points faster!</p>
      </div>

      <button className="claim-btn">Unlock Reward</button>
    </div>
  );
};

export default RewardsCard;
