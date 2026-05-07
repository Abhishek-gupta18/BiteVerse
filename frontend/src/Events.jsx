import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { triggerPageTransition } from './Transition';
import './styles/Events.css';

export default function Events() {
  const navigate = useNavigate();
  const [expandedEvent, setExpandedEvent] = useState(null);

  const upcomingEvents = [
    {
      id: 1,
      title: 'Food Discovery Bootcamp',
      date: 'May 15, 2026',
      time: '2:00 PM - 4:00 PM',
      location: 'Campus Cafeteria',
      icon: '🎓',
      category: 'Workshop',
      attendees: 145,
      description: 'Learn the art of food discovery with our expert guides. Find the best stalls, hidden gems, and master the perfect review.',
      highlights: ['Expert tips', 'Networking', 'Exclusive perks'],
      status: 'Upcoming'
    },
    {
      id: 2,
      title: 'Food Tasting Night',
      date: 'May 18, 2026',
      time: '5:00 PM - 7:30 PM',
      location: 'Dining Hall Main',
      icon: '🍽️',
      category: 'Tasting Event',
      attendees: 89,
      description: 'Experience the finest cuisines from top campus stalls. Sample 8+ signature dishes and vote for your favorite.',
      highlights: ['8+ dishes', 'Voting', 'Winners announced'],
      status: 'Upcoming'
    },
    {
      id: 3,
      title: 'Community Meetup & Food Walk',
      date: 'May 22, 2026',
      time: '3:00 PM - 5:00 PM',
      location: 'Meet at Library Steps',
      icon: '🚶',
      category: 'Meetup',
      attendees: 234,
      description: 'Join fellow food explorers for a guided campus food tour. Discover new stalls, meet the community, and earn bonus XP.',
      highlights: ['Guided tour', 'Community', 'Bonus XP'],
      status: 'Upcoming'
    },
    {
      id: 4,
      title: 'Leaderboard Showdown',
      date: 'May 25, 2026',
      time: '4:00 PM - 6:00 PM',
      location: 'Auditorium',
      icon: '🏆',
      category: 'Competition',
      attendees: 567,
      description: 'Watch top food reviewers compete in live challenges. Win prizes, earn double XP, and become a legend.',
      highlights: ['Live challenges', 'Prizes', 'Double XP'],
      status: 'Upcoming'
    },
    {
      id: 5,
      title: 'Stall Owner Q&A Session',
      date: 'June 1, 2026',
      time: '6:00 PM - 7:30 PM',
      location: 'Virtual / Quad Area',
      icon: '🎤',
      category: 'Q&A',
      attendees: 312,
      description: 'Meet the stall owners! Ask them about their signature dishes, business stories, and get insider recommendations.',
      highlights: ['Q&A session', 'Insider tips', 'Merchandise'],
      status: 'Upcoming'
    },
    {
      id: 6,
      title: 'Monthly Rewards Gala',
      date: 'June 5, 2026',
      time: '7:00 PM - 9:00 PM',
      location: 'Grand Hall',
      icon: '✨',
      category: 'Celebration',
      attendees: 456,
      description: 'Celebrate top reviewers, award winners, and congratulate the community\'s best food explorers of the month.',
      highlights: ['Awards', 'Celebration', 'Networking'],
      status: 'Upcoming'
    }
  ];

  const eventTypes = [
    {
      name: 'Workshops',
      icon: '🎓',
      color: '#7C3AED',
      description: 'Learn expert tips and techniques for food discovery and reviewing'
    },
    {
      name: 'Tastings',
      icon: '🍽️',
      color: '#F59E0B',
      description: 'Experience curated food selections and vote for the best'
    },
    {
      name: 'Meetups',
      icon: '👥',
      color: '#22C55E',
      description: 'Connect with fellow food explorers and build your community'
    },
    {
      name: 'Competitions',
      icon: '🏆',
      color: '#EC4899',
      description: 'Compete in challenges and win amazing prizes'
    },
    {
      name: 'Webinars',
      icon: '💻',
      color: '#06B6D4',
      description: 'Learn from food industry experts via live sessions'
    },
    {
      name: 'Tours',
      icon: '🗺️',
      color: '#8B5CF6',
      description: 'Guided campus tours discovering hidden food gems'
    }
  ];

  const pastEvents = [
    {
      title: 'BiteVerse Launch Party',
      date: 'April 20, 2026',
      icon: '🚀',
      attended: true,
      rating: 4.8,
      reviews: 234
    },
    {
      title: 'Campus Food Festival',
      date: 'April 28, 2026',
      icon: '🎉',
      attended: true,
      rating: 4.7,
      reviews: 189
    },
    {
      title: 'First Review Challenge',
      date: 'May 5, 2026',
      icon: '⭐',
      attended: true,
      rating: 4.9,
      reviews: 156
    }
  ];

  const eventBenefits = [
    {
      icon: '⭐',
      title: 'Earn XP',
      description: 'Get bonus XP points by attending and participating in events'
    },
    {
      icon: '🎁',
      title: 'Win Prizes',
      description: 'Exclusive rewards, merchandise, and vouchers for winners'
    },
    {
      icon: '👥',
      title: 'Build Community',
      description: 'Meet fellow food explorers and make lasting connections'
    },
    {
      icon: '🔥',
      title: 'Boost Streak',
      description: 'Maintain your engagement streak with regular events'
    }
  ];

  const eventCalendar = [
    { week: 'Week 1', events: 1, highlight: 'Bootcamp' },
    { week: 'Week 2', events: 2, highlight: 'Tasting & Meetup' },
    { week: 'Week 3', events: 2, highlight: 'Showdown & Q&A' },
    { week: 'Week 4', events: 1, highlight: 'Rewards Gala' }
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
    <div className="events-container">
      {/* Header */}
      <header className="events-header">
        <button className="events-back-btn" onClick={handleBack}>
          ← Back
        </button>
        <h1>BiteVerse Events</h1>
        <p className="events-subtitle">Join our vibrant community events, competitions, and exclusive food experiences</p>
      </header>

      {/* Quick Stats */}
      <section className="events-stats">
        <div className="stat-box">
          <div className="stat-icon">📅</div>
          <div className="stat-content">
            <div className="stat-number">24+</div>
            <div className="stat-label">Events Monthly</div>
          </div>
        </div>
        <div className="stat-box">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <div className="stat-number">5K+</div>
            <div className="stat-label">Community Members</div>
          </div>
        </div>
        <div className="stat-box">
          <div className="stat-icon">🎁</div>
          <div className="stat-content">
            <div className="stat-number">₹5L+</div>
            <div className="stat-label">Prize Pool</div>
          </div>
        </div>
        <div className="stat-box">
          <div className="stat-icon">⭐</div>
          <div className="stat-content">
            <div className="stat-number">4.8/5</div>
            <div className="stat-label">Event Rating</div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="upcoming-events-section">
        <h2 className="section-title">🗓️ Upcoming Events</h2>
        <div className="events-grid">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="event-card"
              onClick={() => setExpandedEvent(expandedEvent === event.id ? null : event.id)}
              style={{ '--event-color': eventTypes.find(t => t.name === event.category)?.color || '#7C3AED' }}
            >
              <div className="event-card-header">
                <div className="event-icon">{event.icon}</div>
                <div className="event-meta">
                  <span className="event-category">{event.category}</span>
                  <span className="event-status">{event.status}</span>
                </div>
              </div>

              <h3 className="event-title">{event.title}</h3>
              <p className="event-description">{event.description}</p>

              <div className="event-details">
                <div className="detail">
                  <span className="detail-icon">📅</span>
                  <span>{event.date}</span>
                </div>
                <div className="detail">
                  <span className="detail-icon">🕐</span>
                  <span>{event.time}</span>
                </div>
                <div className="detail">
                  <span className="detail-icon">📍</span>
                  <span>{event.location}</span>
                </div>
                <div className="detail">
                  <span className="detail-icon">👥</span>
                  <span>{event.attendees} attending</span>
                </div>
              </div>

              {expandedEvent === event.id && (
                <div className="event-expanded">
                  <h4>Event Highlights:</h4>
                  <ul className="highlights-list">
                    {event.highlights.map((highlight, i) => (
                      <li key={i}>✓ {highlight}</li>
                    ))}
                  </ul>
                  <button className="event-register-btn">Register Now</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Event Types */}
      <section className="event-types-section">
        <h2 className="section-title">🎯 Types of Events</h2>
        <div className="types-grid">
          {eventTypes.map((type, idx) => (
            <div key={idx} className="type-card" style={{ '--type-color': type.color }}>
              <div className="type-icon">{type.icon}</div>
              <h4>{type.name}</h4>
              <p>{type.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Event Calendar Overview */}
      <section className="calendar-section">
        <h2 className="section-title">📊 May Event Overview</h2>
        <div className="calendar-grid">
          {eventCalendar.map((day, idx) => (
            <div key={idx} className="calendar-item">
              <div className="calendar-week">{day.week}</div>
              <div className="calendar-count">{day.events} Event{day.events !== 1 ? 's' : ''}</div>
              <div className="calendar-highlight">{day.highlight}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Event Benefits */}
      <section className="event-benefits-section">
        <h2 className="section-title">🌟 Why Attend Events?</h2>
        <div className="benefits-grid">
          {eventBenefits.map((benefit, idx) => (
            <div key={idx} className="benefit-card">
              <div className="benefit-icon">{benefit.icon}</div>
              <h4>{benefit.title}</h4>
              <p>{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Past Events */}
      <section className="past-events-section">
        <h2 className="section-title">✅ Past Events</h2>
        <div className="past-events-grid">
          {pastEvents.map((event, idx) => (
            <div key={idx} className="past-event-card">
              <div className="past-event-icon">{event.icon}</div>
              <h4>{event.title}</h4>
              <p className="past-event-date">{event.date}</p>
              <div className="past-event-stats">
                <div className="stat">
                  <span className="rating">⭐ {event.rating}</span>
                </div>
                <div className="stat">
                  <span className="reviews">{event.reviews} reviews</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How to Register */}
      <section className="registration-section">
        <h2 className="section-title">📝 How to Register</h2>
        <div className="registration-steps">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>Log In to BiteVerse</h4>
              <p>Sign in to your account or create a new one</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>Browse Events</h4>
              <p>Check out upcoming events and pick your favorite</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h4>Click Register</h4>
              <p>Hit the register button on your chosen event</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <div className="step-content">
              <h4>Get Confirmation</h4>
              <p>Receive event details and reminder notifications</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="events-cta">
        <h2>Ready to Join the Community?</h2>
        <p>Sign up now and never miss exciting food events happening on your campus</p>
        <button className="cta-button primary" onClick={handleGetStarted}>
          Explore Events Now
        </button>
      </section>
    </div>
  );
}
