import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { triggerPageTransition } from './Transition';
import './styles/Work.css';

export default function Work() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [expandedSection, setExpandedSection] = useState(null);

  const mainSteps = [
    {
      id: 0,
      title: 'Sign Up & Get Started',
      icon: '🚀',
      color: '#7C3AED',
      description: 'Create your account with email or Google',
      details: [
        'Visit BiteVerse landing page',
        'Click "Get Started"',
        'Enter email or use Google sign-up',
        'Verify via OTP (One-Time Password)',
        'Set up your profile with dietary preferences',
        'Join your college community'
      ]
    },
    {
      id: 1,
      title: 'Explore & Discover',
      icon: '🔍',
      color: '#06B6D4',
      description: 'Find amazing food stalls and dishes',
      details: [
        'Visit the Explore Food page',
        'Browse trending dishes and stalls',
        'Use filters: budget, cuisine, ratings, open now',
        'Search for specific dishes or cuisines',
        'View real-time stall information',
        'Check out recommended feeds from your circle'
      ]
    },
    {
      id: 2,
      title: 'Review & Share',
      icon: '⭐',
      color: '#F59E0B',
      description: 'Share your food experience with the community',
      details: [
        'Visit a stall and try the dish',
        'Take a photo of your food',
        'Rate the dish (1-5 stars)',
        'Write a detailed review',
        'Share your thoughts on quality, taste, value',
        'Earn XP points for each review (+50 pts)'
      ]
    },
    {
      id: 3,
      title: 'Earn & Reward',
      icon: '🏆',
      color: '#22C55E',
      description: 'Accumulate points and unlock rewards',
      details: [
        'Earn XP from reviews, logins, referrals',
        'Watch your points grow on the dashboard',
        'Set personal reward targets',
        'Redeem points for discounts and items',
        'Get special badges and achievements',
        'Unlock monthly bonuses for streaks'
      ]
    },
    {
      id: 4,
      title: 'Compete & Connect',
      icon: '🏅',
      color: '#EC4899',
      description: 'Join leaderboards and chat with friends',
      details: [
        'View weekly/monthly leaderboards',
        'Track your ranking and XP progress',
        'Join community challenges',
        'Chat with other food explorers',
        'Share stall locations and tips',
        'Build your food circle of friends'
      ]
    }
  ];

  const workflowPhases = [
    {
      title: 'Authentication Phase',
      icon: '🔐',
      color: '#8B5CF6',
      description: 'Secure login with OTP & JWT',
      flow: [
        { step: '1', action: 'User enters email', icon: '📧' },
        { step: '2', action: 'OTP sent to email', icon: '✉️' },
        { step: '3', action: 'OTP verified', icon: '✔️' },
        { step: '4', action: 'JWT token generated', icon: '🔑' }
      ]
    },
    {
      title: 'Discovery Phase',
      icon: '🍽️',
      color: '#06B6D4',
      description: 'Browse and filter food items',
      flow: [
        { step: '1', action: 'Load Explore page', icon: '📱' },
        { step: '2', action: 'Apply filters', icon: '⚙️' },
        { step: '3', action: 'View results', icon: '👀' },
        { step: '4', action: 'Select stall/dish', icon: '✨' }
      ]
    },
    {
      title: 'Engagement Phase',
      icon: '💬',
      color: '#22C55E',
      description: 'Rate, review, and interact',
      flow: [
        { step: '1', action: 'Try the food', icon: '🍴' },
        { step: '2', action: 'Create review', icon: '✍️' },
        { step: '3', action: 'Upload photo', icon: '📸' },
        { step: '4', action: 'Submit & earn XP', icon: '⭐' }
      ]
    },
    {
      title: 'Gamification Phase',
      icon: '🎮',
      color: '#F59E0B',
      description: 'Earn rewards and compete',
      flow: [
        { step: '1', action: 'Accumulate XP', icon: '📊' },
        { step: '2', action: 'Level up', icon: '📈' },
        { step: '3', action: 'Climb leaderboard', icon: '🏆' },
        { step: '4', action: 'Redeem rewards', icon: '🎁' }
      ]
    }
  ];

  const technicalStack = [
    { name: 'Frontend', tech: 'React 18 + Vite + React Router', icon: '⚛️' },
    { name: 'Backend', tech: 'Node.js + Express', icon: '🔧' },
    { name: 'Database', tech: 'MongoDB', icon: '🗄️' },
    { name: 'Authentication', tech: 'JWT + OTP', icon: '🔐' },
    { name: 'Styling', tech: 'CSS3 + Glassmorphism', icon: '🎨' },
    { name: 'Real-time', tech: 'WebSockets', icon: '⚡' }
  ];

  const userJourneySteps = [
    { day: 'Day 1', action: 'Sign up & explore', xp: 0, level: 1 },
    { day: 'Day 3', action: 'Post first review', xp: 50, level: 1 },
    { day: 'Day 7', action: '7-day streak', xp: 150, level: 2 },
    { day: 'Day 14', action: 'Reach 500 XP', xp: 500, level: 3 },
    { day: 'Day 30', action: 'Top reviewer', xp: 1500, level: 5 },
    { day: 'Day 90', action: 'Food legend', xp: 3000, level: 8 }
  ];

  const handleBack = async () => {
    await triggerPageTransition(0, 0, { duration: 700 });
    navigate('/');
  };

  const handleGetStarted = async () => {
    await triggerPageTransition(0, 0, { duration: 700 });
    navigate('/login');
  };

  return (
    <div className="work-container">
      {/* Header */}
      <header className="work-header">
        <button className="work-back-btn" onClick={handleBack}>
          ← Back
        </button>
        <h1>How BiteVerse Works</h1>
        <p className="work-subtitle">From discovery to rewards in 5 simple steps</p>
      </header>

      {/* Main Steps Timeline */}
      <section className="work-steps-section">
        <h2 className="section-title">The Complete Journey</h2>
        
        <div className="steps-timeline">
          {mainSteps.map((step, idx) => (
            <div
              key={step.id}
              className="timeline-item"
              onClick={() => setActiveStep(step.id)}
            >
              <div
                className={`timeline-dot ${activeStep === step.id ? 'active' : ''}`}
                style={{ '--dot-color': step.color }}
              >
                <span className="dot-icon">{step.icon}</span>
              </div>
              {idx < mainSteps.length - 1 && (
                <div
                  className="timeline-line"
                  style={{ '--line-color': step.color }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Active Step Details */}
        <div className="step-details">
          <div className="step-content" style={{ '--content-color': mainSteps[activeStep].color }}>
            <div className="step-header">
              <div className="step-icon">{mainSteps[activeStep].icon}</div>
              <div>
                <h3>{mainSteps[activeStep].title}</h3>
                <p>{mainSteps[activeStep].description}</p>
              </div>
            </div>

            <div className="step-actions">
              {mainSteps[activeStep].details.map((detail, idx) => (
                <div key={idx} className="action-item">
                  <span className="action-number">{idx + 1}</span>
                  <span className="action-text">{detail}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="step-navigation">
            <button
              className="step-nav-btn prev"
              onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
              disabled={activeStep === 0}
            >
              ← Previous
            </button>
            <span className="step-counter">{activeStep + 1} / {mainSteps.length}</span>
            <button
              className="step-nav-btn next"
              onClick={() => setActiveStep(Math.min(mainSteps.length - 1, activeStep + 1))}
              disabled={activeStep === mainSteps.length - 1}
            >
              Next →
            </button>
          </div>
        </div>
      </section>

      {/* Workflow Phases */}
      <section className="work-phases-section">
        <h2 className="section-title">How Different Phases Work</h2>
        <div className="phases-grid">
          {workflowPhases.map((phase, idx) => (
            <div
              key={idx}
              className="phase-card"
              onClick={() => setExpandedSection(expandedSection === idx ? null : idx)}
            >
              <div className="phase-header" style={{ '--phase-color': phase.color }}>
                <span className="phase-icon">{phase.icon}</span>
                <h4>{phase.title}</h4>
              </div>

              <p className="phase-description">{phase.description}</p>

              {expandedSection === idx && (
                <div className="phase-flow">
                  {phase.flow.map((item, i) => (
                    <div key={i} className="flow-item">
                      <div className="flow-step">{item.step}</div>
                      <div className="flow-icon">{item.icon}</div>
                      <div className="flow-action">{item.action}</div>
                      {i < phase.flow.length - 1 && <div className="flow-arrow">→</div>}
                    </div>
                  ))}
                </div>
              )}

              <div className="phase-expand-hint">
                {expandedSection === idx ? '▼ Collapse' : '▶ Show Flow'}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* User Journey */}
      <section className="user-journey-section">
        <h2 className="section-title">Your Growth Timeline</h2>
        <div className="journey-timeline">
          {userJourneySteps.map((step, idx) => (
            <div key={idx} className="journey-item">
              <div className="journey-marker">
                <div className="journey-dot" />
              </div>
              <div className="journey-content">
                <div className="journey-day">{step.day}</div>
                <div className="journey-action">{step.action}</div>
                <div className="journey-stats">
                  <span className="stat xp">+{step.xp} XP</span>
                  <span className="stat level">Level {step.level}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Stack */}
      <section className="tech-stack-section">
        <h2 className="section-title">Technology & Architecture</h2>
        <div className="tech-grid">
          {technicalStack.map((tech, idx) => (
            <div key={idx} className="tech-card">
              <div className="tech-icon">{tech.icon}</div>
              <h4>{tech.name}</h4>
              <p>{tech.tech}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Key Features */}
      <section className="key-features-section">
        <h2 className="section-title">Key Mechanics</h2>
        <div className="features-columns">
          <div className="feature-column">
            <h4>🎯 Point System</h4>
            <ul>
              <li>+50 XP per review</li>
              <li>+10 XP daily login</li>
              <li>+100 XP referral bonus</li>
              <li>+250 XP achievement</li>
              <li>2x points during streaks</li>
            </ul>
          </div>
          <div className="feature-column">
            <h4>🏆 Reward Tiers</h4>
            <ul>
              <li>Bronze: 0-500 XP</li>
              <li>Silver: 501-1000 XP</li>
              <li>Gold: 1001-2000 XP</li>
              <li>Platinum: 2001+ XP</li>
              <li>Exclusive perks per tier</li>
            </ul>
          </div>
          <div className="feature-column">
            <h4>🔄 Community Loop</h4>
            <ul>
              <li>Explore → Find → Review</li>
              <li>Earn → Compete → Reward</li>
              <li>Chat → Share → Connect</li>
              <li>Continuous engagement cycle</li>
              <li>Viral growth mechanics</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="work-cta">
        <h2>Ready to Start Your Food Journey?</h2>
        <p>Join thousands of food explorers and discover amazing dishes on your campus</p>
        <button className="cta-button primary" onClick={handleGetStarted}>
          Get Started Now
        </button>
      </section>
    </div>
  );
}
