import React, { useState, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import ThemeRippleButton from './components/ThemeRippleButton';
import Footer from './components/Footer';
import './styles/Reward.css';

export default function Reward() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const sidebarUserData = useMemo(
    () => ({
      name: 'user',
      college: 'Delhi University',
      avatar:
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
    }),
    [],
  );
  const [targetRewardName, setTargetRewardName] = useState('');
  const [targetPoints, setTargetPoints] = useState('');
  const [userTargets, setUserTargets] = useState([
    { id: 1, rewardName: 'Premium Membership', targetPoints: 500, currentPoints: 340, deadline: '2026-06-15' },
    { id: 2, rewardName: 'Coffee Coupon', targetPoints: 200, currentPoints: 150, deadline: '2026-05-30' }
  ]);
  
  const userPoints = 2450;
  const pointsBreakdown = [
    { activity: 'Reviews', points: 1200, icon: '⭐' },
    { activity: 'Daily Login', points: 450, icon: '📅' },
    { activity: 'Referrals', points: 550, icon: '👥' },
    { activity: 'Achievements', points: 250, icon: '🏆' }
  ];

  const redeemableRewards = [
    {
      id: 1,
      name: '₹50 Stall Discount',
      description: 'Get 50 rupees off at any stall',
      pointsCost: 300,
      category: 'Discount',
      icon: '🏷️'
    },
    {
      id: 2,
      name: 'Free Coffee Coupon',
      description: 'Complimentary coffee at partnered cafes',
      pointsCost: 250,
      category: 'Coupon',
      icon: '☕'
    },
    {
      id: 3,
      name: 'BiteVerse Swag Pack',
      description: 'Exclusive BiteVerse merchandise set',
      pointsCost: 400,
      category: 'Swag',
      icon: '🎁'
    },
    {
      id: 4,
      name: '₹100 Stall Discount',
      description: 'Get 100 rupees off at any stall',
      pointsCost: 550,
      category: 'Discount',
      icon: '🏷️'
    },
    {
      id: 5,
      name: 'Premium Badge',
      description: 'Unlock premium profile badge',
      pointsCost: 200,
      category: 'Badge',
      icon: '⚡'
    },
    {
      id: 6,
      name: 'VIP Access Pass',
      description: 'Priority access to exclusive events',
      pointsCost: 600,
      category: 'Pass',
      icon: '🎫'
    }
  ];

  const handleAddTarget = (e) => {
    e.preventDefault();
    if (targetRewardName && targetPoints) {
      const newTarget = {
        id: userTargets.length + 1,
        rewardName: targetRewardName,
        targetPoints: parseInt(targetPoints),
        currentPoints: 0,
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      };
      setUserTargets([...userTargets, newTarget]);
      setTargetRewardName('');
      setTargetPoints('');
    }
  };

  const handleRemoveTarget = (id) => {
    setUserTargets(userTargets.filter(target => target.id !== id));
  };

  const handleRedeemReward = (reward) => {
    if (userPoints >= reward.pointsCost) {
      alert(`Successfully redeemed: ${reward.name}`);
    } else {
      alert('Insufficient points!');
    }
  };

  return (
    <div className="reward-container">
      <Sidebar isOpen={isSidebarOpen} userData={sidebarUserData} onToggle={() => setIsSidebarOpen((value) => !value)} />
      <ThemeRippleButton className="theme-ripple-button--floating reward-theme-toggle" />
      <div className={`reward-content ${isSidebarOpen ? 'reward-content--open' : 'reward-content--collapsed'}`}>
        <div className="reward-header">
          <h1>🏆 Your Rewards Hub</h1>
          <p className="reward-subtitle">Earn points, set goals, and redeem amazing rewards</p>
        </div>

        <div className="reward-tabs">
          <button
            className={`reward-tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Points Overview
          </button>
          <button
            className={`reward-tab ${activeTab === 'targets' ? 'active' : ''}`}
            onClick={() => setActiveTab('targets')}
          >
            My Targets
          </button>
          <button
            className={`reward-tab ${activeTab === 'redeem' ? 'active' : ''}`}
            onClick={() => setActiveTab('redeem')}
          >
            Redeem Rewards
          </button>
        </div>

        {/* Section 1: Points Earned Overview */}
        {activeTab === 'overview' && (
          <div className="reward-section points-overview">
            <div className="total-points-card">
              <div className="points-display">
                <h2>Total Points</h2>
                <div className="points-value">{userPoints}</div>
                <p className="points-subtitle">Keep earning to unlock more rewards</p>
              </div>
              <div className="points-chart">
                <svg viewBox="0 0 120 120" className="progress-circle">
                  <circle cx="60" cy="60" r="50" className="progress-bg"></circle>
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    className="progress-fill"
                    style={{ strokeDasharray: `${(userPoints / 3000) * 314} 314` }}
                  ></circle>
                  <text x="60" y="60" textAnchor="middle" dy=".3em" className="progress-text">
                    {Math.round((userPoints / 3000) * 100)}%
                  </text>
                </svg>
              </div>
            </div>

            <div className="points-breakdown">
              <h3>Points Breakdown</h3>
              <div className="breakdown-grid">
                {pointsBreakdown.map((item, index) => (
                  <div key={index} className="breakdown-card">
                    <div className="breakdown-icon">{item.icon}</div>
                    <div className="breakdown-info">
                      <h4>{item.activity}</h4>
                      <p className="breakdown-points">+{item.points} pts</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="recent-activity">
              <h3>Recent Activity</h3>
              <div className="activity-list">
                <div className="activity-item">
                  <span className="activity-label">⭐ Reviewed: Pasta Corner</span>
                  <span className="activity-points">+50 pts</span>
                  <span className="activity-time">Today</span>
                </div>
                <div className="activity-item">
                  <span className="activity-label">📅 Daily Login Bonus</span>
                  <span className="activity-points">+10 pts</span>
                  <span className="activity-time">Today</span>
                </div>
                <div className="activity-item">
                  <span className="activity-label">👥 Referral Bonus</span>
                  <span className="activity-points">+100 pts</span>
                  <span className="activity-time">Yesterday</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section 2: User-Set Targets */}
        {activeTab === 'targets' && (
          <div className="reward-section user-targets">
            <div className="targets-header">
              <h3>Set Your Reward Targets</h3>
              <p>Create personalized goals for specific rewards</p>
            </div>

            <form className="target-form" onSubmit={handleAddTarget}>
              <div className="form-group">
                <label htmlFor="rewardName">Reward Name</label>
                <input
                  type="text"
                  id="rewardName"
                  placeholder="E.g., Premium Membership, Special Coupon"
                  value={targetRewardName}
                  onChange={(e) => setTargetRewardName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="targetPoints">Target Points</label>
                <input
                  type="number"
                  id="targetPoints"
                  placeholder="E.g., 500"
                  value={targetPoints}
                  onChange={(e) => setTargetPoints(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn-add-target">
                + Add Target
              </button>
            </form>

            <div className="targets-list">
              <h3>Your Active Targets</h3>
              {userTargets.length === 0 ? (
                <p className="empty-state">No targets set yet. Create one above!</p>
              ) : (
                <div className="targets-grid">
                  {userTargets.map((target) => (
                    <div key={target.id} className="target-card">
                      <div className="target-header">
                        <h4>{target.rewardName}</h4>
                        <button
                          className="btn-remove"
                          onClick={() => handleRemoveTarget(target.id)}
                        >
                          ✕
                        </button>
                      </div>
                      <div className="target-progress">
                        <div className="progress-bar-container">
                          <div
                            className="progress-bar-fill"
                            style={{ width: `${(target.currentPoints / target.targetPoints) * 100}%` }}
                          ></div>
                        </div>
                        <p className="progress-text">
                          {target.currentPoints} / {target.targetPoints} pts
                        </p>
                      </div>
                      <p className="target-deadline">Deadline: {target.deadline}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Section 3: Redeemable Rewards */}
        {activeTab === 'redeem' && (
          <div className="reward-section redeemable-rewards">
            <div className="redeem-header">
              <h3>Redeemable Rewards Catalog</h3>
              <p>You have {userPoints} points available</p>
            </div>

            <div className="rewards-grid">
              {redeemableRewards.map((reward) => (
                <div key={reward.id} className="reward-card">
                  <div className="reward-icon">{reward.icon}</div>
                  <div className="reward-badge">{reward.category}</div>
                  <h4>{reward.name}</h4>
                  <p className="reward-description">{reward.description}</p>
                  <div className="reward-cost">
                    <span className="cost-value">{reward.pointsCost}</span>
                    <span className="cost-unit">points</span>
                  </div>
                  <button
                    className={`btn-redeem ${userPoints < reward.pointsCost ? 'disabled' : ''}`}
                    onClick={() => handleRedeemReward(reward)}
                    disabled={userPoints < reward.pointsCost}
                  >
                    {userPoints < reward.pointsCost ? 'Insufficient Points' : 'Redeem'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <Footer variant="rewards" />
      </div>
    </div>
  );
}
