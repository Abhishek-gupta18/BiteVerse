import React, { useState } from "react";
import "../../styles/RecommendedFeed.css";

const RecommendedFeed = ({ food }) => {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <section className="recommended-feed">
      <div className="feed-header">
        <h2 className="feed-title">🍔 Recommended for You</h2>
        <button className="view-all-link">View All →</button>
      </div>

      <div className="food-grid">
        {food.map((item) => (
          <div
            key={item.id}
            className={`food-card ${hoveredCard === item.id ? "hovered" : ""}`}
            onMouseEnter={() => setHoveredCard(item.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="food-image-container">
              <img src={item.image} alt={item.name} className="food-image" />
              <span className="food-tag">{item.tag}</span>
            </div>

            <div className="food-info">
              <div className="food-header">
                <h4 className="food-name">{item.name}</h4>
                <span className="food-price">{item.price}</span>
              </div>
              <p className="food-stall">{item.stall}</p>

              <div className="food-footer">
                <div className="rating">
                  <span className="star">⭐</span>
                  <span className="rating-value">{item.rating}</span>
                </div>
                <button className="add-btn">+</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecommendedFeed;
