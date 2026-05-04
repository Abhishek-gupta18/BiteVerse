import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import "../styles/Navbar.css";

const Navbar = ({ onNotificationsToggle, userData }) => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const { theme, toggleTheme } = useTheme();

  const notifications = [
    {
      id: 1,
      type: "review",
      message: "Rahul liked your review on Garlic Butter Naan",
      time: "5 min ago",
    },
    {
      id: 2,
      type: "mention",
      message: "You were mentioned in a comment about best budget meals",
      time: "1 hour ago",
    },
    {
      id: 3,
      type: "achievement",
      message: "You reached Level 6! New badge unlocked: Food Master",
      time: "2 hours ago",
    },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-left">
          <div className="brand">
            <span className="brand-icon">🍽️</span>
            <span className="brand-text">CampusEats</span>
          </div>
        </div>

        <div className="navbar-center">
          <div className="search-wrapper">
            <input
              type="text"
              className="search-input"
              placeholder="Search food, stalls, users..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button className="search-btn">🔍</button>
          </div>
        </div>

        <div className="navbar-right">
          <button
            className={`theme-toggle ${theme}`}
            onClick={toggleTheme}
            aria-label="Toggle theme"
            type="button"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          >
            <span className="toggle-icon">{theme === 'light' ? '🌙' : '☀️'}</span>
          </button>

          <div className="notification-wrapper" aria-label="Notification bar">
            <button
              className="icon-btn notification-btn"
              onClick={onNotificationsToggle}
              type="button"
            >
              <span className="icon">🔔</span>
              <span className="notification-badge">{notifications.length}</span>
            </button>
          </div>

          <button
            className="icon-btn"
            type="button"
            aria-label="Chat option"
            onClick={() => navigate("/chat")}
          >
            <span className="icon">💬</span>
            <span className="notification-badge">12</span>
          </button>

          <div className="profile-dropdown-wrapper">
            <button className="profile-pic-btn" type="button" aria-label="Profile">
              <img src={userData.avatar} alt="Profile" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
