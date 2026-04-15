import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import HeroCard from "./components/sections/HeroCard";
import StreakCard from "./components/sections/StreakCard";
import RecommendedFeed from "./components/sections/RecommendedFeed";
import RewardsCard from "./components/sections/RewardsCard";
import AchievementsSection from "./components/sections/AchievementsSection";
import ReviewHistorySection from "./components/sections/ReviewHistorySection";

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

  // Mock stats data
  const stats = {
    totalReviews: 42,
    averageRating: 4.8,
    pointsEarned: 1250,
    currentStreak: 7,
  };

  // Mock recommended food data
  const recommendedFood = [
    {
      id: 1,
      name: "Garlic Butter Naan",
      stall: "The Tandoor",
      image: "https://images.unsplash.com/photo-1565557623814-695d26c6631c?w=400",
      price: "₹80",
      rating: 4.7,
      tag: "Popular",
    },
    {
      id: 2,
      name: "Vegetable Biryani",
      stall: "Spice Kitchen",
      image: "https://images.unsplash.com/photo-1584737604270-a0b58674d621?w=400",
      price: "₹120",
      rating: 4.5,
      tag: "Trending",
    },
    {
      id: 3,
      name: "Grilled Paneer Tikka",
      stall: "BBQ Masters",
      image: "https://images.unsplash.com/photo-1599043513691-9134cc900bb0?w=400",
      price: "₹150",
      rating: 4.9,
      tag: "Healthy",
    },
    {
      id: 4,
      name: "Margherita Pizza",
      stall: "Italian Bites",
      image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400",
      price: "₹200",
      rating: 4.6,
      tag: "Comfort Food",
    },
  ];

  // Mock reviews data
  const reviews = [
    {
      id: 1,
      foodName: "West Quad Salad",
      stallName: "The Harvest Bowl",
      image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=300",
      rating: 5.0,
      review: "Hands down the best salad on campus. The avocado was perfectly ripe.",
      tags: ["Healthy Choice"],
      timestamp: "2 days ago",
    },
    {
      id: 2,
      foodName: "Smash Burger Deluxe",
      stallName: "The Union Hub",
      image: "https://images.unsplash.com/photo-1571407970349-bc2e8c8bd10f?w=300",
      rating: 4.2,
      review: "Great flavor, but the wait time was nearly 20 minutes during rush hour.",
      tags: ["Comfort Food"],
      timestamp: "1 week ago",
    },
  ];

  // Mock rewards data
  const rewards = {
    nextReward: "50% Off Meal Bowl",
    progress: 750,
    total: 1000,
    badges: [
      { id: 1, name: "Gourmet Student", icon: "🍴" },
      { id: 2, name: "Early Bird Reviewer", icon: "🌅" },
      { id: 3, name: "Food Explorer", icon: "🗺️" },
    ],
  };

  return (
    <div className="dashboard-container">
      <Sidebar
        isOpen={sidebarOpen}
        userRole={userRole}
        userData={userData}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      <div className="main-content">
        <Navbar
          onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
          onNotificationsToggle={() => setNotificationsOpen(!notificationsOpen)}
          userData={userData}
        />
        <div className="dashboard-content">
          <div className="content-grid">
            {/* Left Column */}
            <div className="left-column">
              <HeroCard stats={stats} userData={userData} />
              <StreakCard currentStreak={stats.currentStreak} />
            </div>

            {/* Right Column */}
            <div className="right-column">
              <RewardsCard reward={rewards} />
              <AchievementsSection badges={rewards.badges} />
            </div>
          </div>

          {/* Full Width Sections */}
          <div className="full-width">
            <RecommendedFeed food={recommendedFood} />
            <ReviewHistorySection reviews={reviews} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
