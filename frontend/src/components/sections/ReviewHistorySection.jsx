import React, { useState } from "react";
import "../../styles/ReviewHistorySection.css";

const ReviewHistorySection = ({ reviews }) => {
  const [activeFilter, setActiveFilter] = useState("latest");

  return (
    <section className="review-history">
      <div className="review-header">
        <h2 className="review-title">📝 Your Recent Reviews</h2>
        <div className="review-filters">
          <button
            className={`filter-btn ${activeFilter === "latest" ? "active" : ""}`}
            onClick={() => setActiveFilter("latest")}
          >
            Latest
          </button>
          <button
            className={`filter-btn ${activeFilter === "toprated" ? "active" : ""}`}
            onClick={() => setActiveFilter("toprated")}
          >
            Top Rated
          </button>
        </div>
      </div>

      <div className="reviews-list">
        {reviews.map((review) => (
          <div key={review.id} className="review-card">
            <div className="review-content">
              <div className="review-image">
                <img src={review.image} alt={review.foodName} />
              </div>

              <div className="review-details">
                <div className="review-title-section">
                  <div>
                    <h4 className="review-dish-name">{review.foodName}</h4>
                    <p className="review-stall-name">{review.stallName}</p>
                  </div>
                  <div className="review-rating">
                    <span className="rating-stars">⭐ {review.rating}</span>
                  </div>
                </div>

                <p className="review-text">{review.review}</p>

                <div className="review-tags">
                  {review.tags.map((tag, idx) => (
                    <span key={idx} className="review-tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="review-time">{review.timestamp}</p>
              </div>

              <div className="review-actions">
                <button className="action-btn like-btn" title="Like">
                  👍
                </button>
                <button className="action-btn comment-btn" title="Comment">
                  💬
                </button>
                <button className="action-btn share-btn" title="Share">
                  🔗
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="load-more-section">
        <button className="load-more-btn">Load More Reviews</button>
      </div>
    </section>
  );
};

export default ReviewHistorySection;
