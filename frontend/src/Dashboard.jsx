import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

const Dashboard = ({ userRole = "student" }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    const applySidebarMode = (event) => {
      setSidebarOpen(!event.matches);
    };

    applySidebarMode(mediaQuery);
    mediaQuery.addEventListener("change", applySidebarMode);

    return () => {
      mediaQuery.removeEventListener("change", applySidebarMode);
    };
  }, []);

  // Mock user data
  const userData = {
    name: "Rahul Kumar",
    college: "Delhi University",
    level: 5,
    avatar:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahman&backgroundColor=random",
  };

  const stats = {
    totalReviews: 42,
    averageRating: 4.8,
    pointsEarned: 1250,
    currentStreak: 7,
  };

  const preferenceSignals = ["Late afternoon", "Rainy weather", "Recent: spicy noodles", "Campus favorites"];

  const recommendedFood = [
    {
      id: 1,
      name: "Garlic Butter Naan",
      stall: "The Tandoor",
      price: "₹80",
      rating: 4.7,
      reason: "Best when you want something warm and quick.",
    },
    {
      id: 2,
      name: "Vegetable Biryani",
      stall: "Spice Kitchen",
      price: "₹120",
      rating: 4.5,
      reason: "Popular for rainy evenings and shared meals.",
    },
    {
      id: 3,
      name: "Grilled Paneer Tikka",
      stall: "BBQ Masters",
      price: "₹150",
      rating: 4.9,
      reason: "High protein pick for post-class hunger.",
    },
  ];

  const badges = [
    {
      id: 1,
      name: "Gourmet Student",
      icon: "🍴",
      detail: "Reviews written",
    },
    {
      id: 2,
      name: "Early Bird Reviewer",
      icon: "🌅",
      detail: "Morning check-ins",
    },
    {
      id: 3,
      name: "Food Explorer",
      icon: "🗺️",
      detail: "Stalls discovered",
    },
  ];

  const rewards = {
    nextReward: "50% Off Meal Bowl",
    progress: 750,
    total: 1000,
  };

  const chatPreview = [
    {
      id: 1,
      name: "Aarav",
      time: "2m",
      message: "The west gate wrap stall has a new combo meal today.",
      tone: "warm",
    },
    {
      id: 2,
      name: "Meera",
      time: "8m",
      message: "I’m heading there after class. Want me to save a seat?",
      tone: "soft",
    },
    {
      id: 3,
      name: "You",
      time: "Now",
      message: "Yes. Also checking the dessert cart on the way back.",
      tone: "calm",
    },
  ];

  return (
    <div className="dashboard-shell">
      <Sidebar
        isOpen={sidebarOpen}
        userRole={userRole}
        userData={userData}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      <div className="dashboard-main">
        <Navbar
          onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
          onNotificationsToggle={() => setNotificationsOpen(!notificationsOpen)}
          userData={userData}
        />
        <main className="dashboard-content">
          <div className="dashboard-grid">
            <section className="panel panel--food">
              <div className="panel-heading">
                <div>
                  <p className="panel-kicker">Food preference</p>
                  <h1>Recommendations shaped by time, season, and past searches</h1>
                </div>
                <div className="panel-meta">
                  <span className="meta-pill">Updated 2 min ago</span>
                  <span className="meta-pill meta-pill--accent">{stats.totalReviews} reviews</span>
                  <span className="meta-pill">{stats.currentStreak}-day streak</span>
                </div>
              </div>

              <div className="preference-tags" aria-label="Recommendation signals">
                {preferenceSignals.map((signal) => (
                  <span key={signal} className="preference-tag">
                    {signal}
                  </span>
                ))}
              </div>

              <div className="food-list">
                {recommendedFood.map((food) => (
                  <article key={food.id} className="food-card">
                    <div>
                      <p className="food-card__label">{food.stall}</p>
                      <h2>{food.name}</h2>
                      <p className="food-card__reason">{food.reason}</p>
                    </div>
                    <div className="food-card__footer">
                      <strong>{food.price}</strong>
                      <span>★ {food.rating}</span>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="panel panel--reward">
              <div className="panel-heading panel-heading--compact">
                <div>
                  <p className="panel-kicker">Reward info</p>
                  <h2>{rewards.nextReward}</h2>
                </div>
                <span className="points-chip">{stats.pointsEarned} pts</span>
              </div>

              <div className="reward-stats">
                <div>
                  <span>Target</span>
                  <strong>{rewards.total} pts</strong>
                </div>
                <div>
                  <span>Current points</span>
                  <strong>{rewards.progress} pts</strong>
                </div>
              </div>

              <div className="progress-track" aria-label="Reward progress">
                <span style={{ width: `${(rewards.progress / rewards.total) * 100}%` }} />
              </div>

              <div className="reward-actions">
                <button className="primary-action" type="button">
                  Earn More
                </button>
                <button className="secondary-action" type="button">
                  Redeem
                </button>
              </div>
            </section>

            <section className="panel panel--achievements">
              <div className="panel-heading panel-heading--compact">
                <div>
                  <p className="panel-kicker">Current achievement</p>
                  <h2>Badges and milestones</h2>
                </div>
              </div>

              <div className="badge-row">
                {badges.map((badge) => (
                  <article key={badge.id} className="badge-card">
                    <span className="badge-icon">{badge.icon}</span>
                    <strong>{badge.name}</strong>
                    <p>{badge.detail}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="panel panel--chat">
              <div className="panel-heading panel-heading--compact">
                <div>
                  <p className="panel-kicker">Chat option</p>
                  <h2>Minimized chat section</h2>
                </div>
                <div className="panel-meta panel-meta--chat">
                  <span className="meta-pill">12 unread</span>
                  <span className="meta-pill">3 online</span>
                </div>
              </div>

              <div className="chat-mini-feed">
                {chatPreview.map((message) => (
                  <article key={message.id} className={`chat-mini-card chat-mini-card--${message.tone}`}>
                    <div className="chat-mini-card__top">
                      <strong>{message.name}</strong>
                      <span>{message.time}</span>
                    </div>
                    <p>{message.message}</p>
                  </article>
                ))}
              </div>

              <div className="chat-mini-compose" aria-label="Chat quick reply">
                <span className="chat-mini-compose__icon">✎</span>
                <input type="text" placeholder="Write a quick reply..." />
                <button type="button">Send</button>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
