import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import "../styles/Navbar.css";

const Navbar = ({ onNotificationsToggle, userData, isSidebarOpen = false }) => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { logout } = useAuth();

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
    <nav 
      className="navbar"
      style={{
        marginLeft: isSidebarOpen ? '220px' : '90px',
        transition: 'margin-left 0.38s ease-in-out'
      }}
    >
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

          <div className="profile-dropdown-wrapper">
            <button className="profile-pic-btn" type="button" aria-label="Profile">
              <img src={userData.avatar} alt="Profile" />
            </button>
          </div>

          <button
            type="button"
            onClick={async () => {
              await logout();
              navigate('/login');
            }}
            style={{
              background: '#ef4444',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              padding: '0.6rem 0.9rem',
              fontWeight: 600,
              cursor: 'pointer',
              marginLeft: '0.5rem',
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
