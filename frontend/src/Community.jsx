import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { triggerPageTransition } from './Transition';
import './styles/Community.css';

export default function Community() {
  const navigate = useNavigate();
  const [activeCircle, setActiveCircle] = useState('reviewers');

  const communityStats = [
    { value: '12.4K', label: 'Active Members' },
    { value: '540+', label: 'Campus Circles' },
    { value: '48K', label: 'Reviews Shared' },
    { value: '1.8M', label: 'XP Earned Together' },
  ];

  const circles = [
    {
      id: 'reviewers',
      name: 'Review Crew',
      icon: '⭐',
      description: 'Write detailed reviews, add food photos, and help everyone discover the best dishes faster.',
      perks: ['Bonus XP on helpful reviews', 'Featured reviewer badges', 'Early access to new stalls'],
      members: '3.1K members',
      vibe: '#f59e0b',
    },
    {
      id: 'explorers',
      name: 'Street Explorers',
      icon: '🧭',
      description: 'Map hidden gems, discover underrated stalls, and create city food trails for newcomers.',
      perks: ['Trail creator rewards', 'Discovery missions', 'Map contribution streaks'],
      members: '2.8K members',
      vibe: '#06b6d4',
    },
    {
      id: 'creators',
      name: 'Food Creators Hub',
      icon: '🎬',
      description: 'Share reels, tasting notes, and mini food stories to inspire your campus community.',
      perks: ['Creator spotlight slots', 'Brand collab opportunities', 'Higher engagement multipliers'],
      members: '1.9K members',
      vibe: '#ec4899',
    },
  ];

  const weeklyChallenges = [
    {
      title: '5-Stall Sprint',
      description: 'Try 5 different stalls this week and post at least 3 verified reviews.',
      reward: '+450 XP + Discovery Badge',
    },
    {
      title: 'Budget Bites Quest',
      description: 'Find the best meal under Rs. 120 and share your value ranking list.',
      reward: '+320 XP + Smart Saver Tag',
    },
    {
      title: 'Community Relay',
      description: 'Invite 2 friends, create one shared food list, and complete one meetup check-in.',
      reward: '+500 XP + Circle Boost',
    },
  ];

  const testimonials = [
    {
      quote: 'I found my entire food group through BiteVerse circles. Reviews now feel social and fun.',
      name: 'Aarav M.',
      role: 'Campus Explorer, DU',
    },
    {
      quote: 'Weekly challenges helped me stay consistent. My streak jumped from 4 to 29 days.',
      name: 'Ritika S.',
      role: 'Top Reviewer, BITS',
    },
    {
      quote: 'As a food creator, this community gave me instant feedback and real audience growth.',
      name: 'Kunal P.',
      role: 'Food Creator, IITB',
    },
  ];

  const activeCommunity = circles.find((circle) => circle.id === activeCircle) || circles[0];

  const handleBack = async () => {
    await triggerPageTransition(0, 0, { duration: 700 });
    navigate('/');
  };

  const handleJoinNow = async () => {
    await triggerPageTransition(0, 0, { duration: 700 });
    navigate('/register');
  };

  return (
    <div className="community-page">
      <header className="community-hero">
        <button className="community-back" onClick={handleBack}>← Back</button>
        <h1>Built for food lovers, powered by community</h1>
        <p>
          Join circles, complete group challenges, share trusted reviews, and grow your
          food reputation with people who love discovering flavors as much as you do.
        </p>

        <div className="community-stats">
          {communityStats.map((stat) => (
            <article key={stat.label} className="community-stat-card">
              <h3>{stat.value}</h3>
              <span>{stat.label}</span>
            </article>
          ))}
        </div>
      </header>

      <section className="circle-section">
        <div className="circle-head">
          <h2>Find your circle</h2>
          <p>Pick a community lane that matches your vibe and goals.</p>
        </div>

        <div className="circle-tabs">
          {circles.map((circle) => (
            <button
              key={circle.id}
              className={`circle-tab ${activeCircle === circle.id ? 'active' : ''}`}
              onClick={() => setActiveCircle(circle.id)}
            >
              <span>{circle.icon}</span>
              {circle.name}
            </button>
          ))}
        </div>

        <article className="circle-detail" style={{ '--vibe-color': activeCommunity.vibe }}>
          <div className="circle-detail__header">
            <h3>{activeCommunity.icon} {activeCommunity.name}</h3>
            <span>{activeCommunity.members}</span>
          </div>
          <p>{activeCommunity.description}</p>
          <ul>
            {activeCommunity.perks.map((perk) => (
              <li key={perk}>{perk}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="community-challenges">
        <h2>Weekly community challenges</h2>
        <div className="challenge-grid">
          {weeklyChallenges.map((challenge, index) => (
            <article key={challenge.title} className="challenge-card" style={{ animationDelay: `${index * 0.12}s` }}>
              <h3>{challenge.title}</h3>
              <p>{challenge.description}</p>
              <div className="challenge-reward">Reward: {challenge.reward}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="community-voices">
        <h2>What members say</h2>
        <div className="voice-grid">
          {testimonials.map((item) => (
            <article key={item.name} className="voice-card">
              <p>“{item.quote}”</p>
              <h4>{item.name}</h4>
              <span>{item.role}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="community-cta">
        <h2>Ready to join the BiteVerse community?</h2>
        <p>Start your profile, pick your first circle, and unlock your first challenge today.</p>
        <button onClick={handleJoinNow}>Join Community</button>
      </section>
    </div>
  );
}
