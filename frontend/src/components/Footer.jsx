import React from 'react';
import '../styles/Footer.css';

const Footer = ({ variant = 'default', compact = false }) => {
  const year = new Date().getFullYear();

  return (
    <footer className={`bv-footer bv-footer--${variant} ${compact ? 'bv-footer--compact' : ''}`}>
      <div className="bv-footer__brand">
        <span className="bv-footer__mark" aria-hidden="true">BV</span>
        <div>
          <strong>BiteVerse</strong>
          <p>Campus food, reviews, and community in one place.</p>
        </div>
      </div>

      <nav className="bv-footer__links" aria-label="Footer">
        <a href="/dashboard">Dashboard</a>
        <a href="/chat">Chat</a>
        <a href="/leaderboard">Leaderboard</a>
      </nav>

      <p className="bv-footer__meta">© {year} BiteVerse</p>
    </footer>
  );
};

export default Footer;
