import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Sidebar.css";

const Sidebar = ({ isOpen, userRole, userData, onToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeNav, setActiveNav] = useState("dashboard");

  useEffect(() => {
    if (location.pathname === "/chat") {
      setActiveNav("chats");
      return;
    }

    if (location.pathname === "/dashboard") {
      setActiveNav("dashboard");
    }
  }, [location.pathname]);

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "explore", label: "Explore Food", icon: "🍽️" },
    { id: "stalls", label: "Dining Halls", icon: "🏪" },
    { id: "reviews", label: "Reviews", icon: "⭐" },
    { id: "rewards", label: "Rewards", icon: "🏆" },
    { id: "leaderboard", label: "Leaderboard", icon: "🥇" },
    { id: "community", label: "Community", icon: "👥" },
    { id: "chats", label: "Messages", icon: "💬" },
  ];

  return (
    <>
      <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
        {/* Profile Section */}
        <div className="sidebar-profile">
          <div className="profile-avatar">
            <img src={userData.avatar} alt={userData.name} />
            <span className="level-badge">{userData.level}</span>
          </div>
          <div className="profile-info">
            <h3 className="profile-name">{userData.name}</h3>
            <p className="profile-college">{userData.college}</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activeNav === item.id ? "active" : ""}`}
              onClick={() => {
                setActiveNav(item.id);

                if (item.id === "chats") {
                  navigate("/chat");
                }
              }}
            >
              <span className="nav-icon">{item.icon}</span>
              {isOpen && <span className="nav-label">{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Write Review Button */}
        {isOpen && (
          <button className="write-review-btn">
            <span>✏️</span> Write a Review
          </button>
        )}

        {/* Bottom Section */}
        <div className="sidebar-bottom">
          <button className="bottom-item">
            <span>⚙️</span> {isOpen && "Settings"}
          </button>
          <button className="bottom-item">
            <span>💬</span> {isOpen && "Support"}
          </button>
        </div>
      </div>

      {/* Sidebar Toggle Button */}
      <button 
        className="sidebar-toggle" 
        onClick={onToggle}
        title={isOpen ? "Collapse sidebar" : "Expand sidebar"}
      >
        <span className="toggle-icon">☰</span>
      </button>
    </>
  );
};

export default Sidebar;
