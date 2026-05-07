import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Sidebar.css";

const Sidebar = ({ isOpen, userData, onToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const activeNavByPath = {
    "/chat": "chats",
    "/dashboard": "dashboard",
    "/explore-food": "explore",
    "/leaderboard": "leaderboard",
  };
  const activeNav = activeNavByPath[location.pathname] || "dashboard";

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "explore", label: "Explore Food", icon: "🍽️" },
    { id: "stalls", label: "Dining Halls", icon: "🏪" },
    { id: "reviews", label: "Reviews", icon: "⭐" },
    { id: "rewards", label: "Rewards", icon: "🏆" },
    { id: "leaderboard", label: "Leaderboard", icon: "🏅" },
    { id: "community", label: "Community", icon: "👥" },
    { id: "chats", label: "Messages", icon: "💬" },
  ];

  return (
    <>
      <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <div className="sidebar-brand" aria-label="Brand logo">
          <span>🍽️</span>
        </div>

        <div className="sidebar-user" aria-label="User icon on dashboard">
          <div className="sidebar-user__avatar">
            <img src={userData.avatar} alt={userData.name} />
          </div>
          {isOpen && (
            <div className="sidebar-user__meta">
              <strong>{userData.name}</strong>
              <span>{userData.college}</span>
            </div>
          )}
        </div>

        {isOpen && <p className="sidebar-rail-label">Expandable Sidebar</p>}

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activeNav === item.id ? "active" : ""}`}
              onClick={() => {
                if (item.id === "dashboard") {
                  navigate("/dashboard");
                }
                if (item.id === "explore") {
                  navigate("/explore-food");
                }

                if (item.id === "chats") {
                  navigate("/chat");
                }
                if (item.id === "leaderboard") {
                  navigate("/leaderboard");
                }
              }}
            >
              <span className="nav-icon">{item.icon}</span>
              {isOpen && <span className="nav-label">{item.label}</span>}
            </button>
          ))}
        </nav>
      </div>

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
