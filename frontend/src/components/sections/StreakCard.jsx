import React from "react";
import "../../styles/StreakCard.css";

const StreakCard = ({ currentStreak }) => {
  // Mock weekly data (0-7 days)
  const weeklyData = [
    { day: "Mon", activity: 2 },
    { day: "Tue", activity: 5 },
    { day: "Wed", activity: 0 },
    { day: "Thu", activity: 3 },
    { day: "Fri", activity: 4 },
    { day: "Sat", activity: 6 },
    { day: "Sun", activity: 1 },
  ];

  const maxActivity = Math.max(...weeklyData.map((d) => d.activity)) || 1;

  return (
    <div className="streak-card">
      <div className="streak-header">
        <h3 className="streak-title">🔥 Weekly Streak</h3>
        <div className="streak-count">
          <span className="streak-number">{currentStreak}</span>
          <span className="streak-text">Days Active</span>
        </div>
      </div>

      <div className="activity-chart">
        {weeklyData.map((day, index) => (
          <div key={index} className="activity-bar-wrapper">
            <div
              className={`activity-bar ${day.activity > 0 ? "active" : ""}`}
              style={{
                height: `${(day.activity / maxActivity) * 100}%`,
              }}
            ></div>
            <span className="day-label">{day.day}</span>
          </div>
        ))}
      </div>

      <p className="streak-message">
        🎯 Review 1 more meal to maintain your {currentStreak}-day streak!
      </p>
      <button className="streak-action">Write a Review</button>
    </div>
  );
};

export default StreakCard;
