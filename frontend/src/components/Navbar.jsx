import React, { useState } from "react";
import "../styles/Navbar.css";

const Navbar = ({ onSidebarToggle, onNotificationsToggle, userData }) => {
  const [searchValue, setSearchValue] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);

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
        {/* Left Section - Logo/Brand */}
        <div className="navbar-left">
          <div className="brand">
            <span className="brand-icon">🍽️</span>
            <span className="brand-text">CampusEats</span>
          </div>
        </div>

        {/* Center Section - Search */}
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

        {/* Right Section - Icons & Profile */}
        <div className="navbar-right">
          {/* Notifications */}
          <div className="notification-wrapper">
            <button
              className="icon-btn notification-btn"
              onClick={onNotificationsToggle}
            >
              <span className="icon">🔔</span>
              <span className="notification-badge">3</span>
            </button>
            <div className="notification-dropdown">
              {notifications.map((notif) => (
                <div key={notif.id} className="notification-item">
                  <p>{notif.message}</p>
                  <small>{notif.time}</small>
                </div>
              ))}
              <button className="view-all-btn">View All Notifications</button>
            </div>
          </div>

          {/* Messages */}
          <button className="icon-btn">
            <span className="icon">💬</span>
            <span className="notification-badge">2</span>
          </button>

          {/* Profile Dropdown */}
          <div className="profile-dropdown-wrapper">
            <button
              className="profile-pic-btn"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              <img src={userData.avatar} alt="Profile" />
            </button>
            {showProfileMenu && (
              <div className="profile-menu">
                <div className="profile-menu-header">
                  <img src={userData.avatar} alt="Profile" />
                  <div>
                    <p className="menu-name">{userData.name}</p>
                    <p className="menu-email">user@college.edu</p>
                  </div>
                </div>
                <hr />
                <button className="menu-item">👤 My Profile</button>
                <button className="menu-item">📝 My Reviews</button>
                <button className="menu-item">📋 My Rewards</button>
                <button className="menu-item">⚙️ Settings</button>
                <button className="menu-item">🎨 Preferences</button>
                <hr />
                <button className="menu-item logout">🚪 Logout</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
