import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import Footer from "../Footer";
import "../../styles/chat.css";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: "DB", route: "/dashboard" },
  { id: "explore", label: "Explore Food", icon: "EF", route: "/explore-food" },
  { id: "reviews", label: "Reviews", icon: "RV" },
  { id: "rewards", label: "Rewards", icon: "RW" },
  { id: "leaderboard", label: "Leaderboard", icon: "LB", route: "/leaderboard" },
  { id: "community", label: "Community", icon: "CM" },
  { id: "chats", label: "Messages", icon: "MS", route: "/chat" },
];

const channels = [
  { id: "campus", name: "Campus Commons", meta: "24 online", active: true },
  { id: "reviews", name: "Review Helpdesk", meta: "8 new" },
  { id: "plans", name: "Lunch Plans", meta: "12 members" },
  { id: "support", name: "BiteVerse Support", meta: "staff" },
];

const participants = [
  { id: 1, name: "Alex P.", avatar: "AP", status: "online", role: "Food critic" },
  { id: 2, name: "Sarah M.", avatar: "SM", status: "online", role: "Reviewer" },
  { id: 3, name: "Jordan K.", avatar: "JK", status: "away", role: "Explorer" },
  { id: 4, name: "Leo W.", avatar: "LW", status: "online", role: "Moderator" },
];

const quickReplies = ["Line update?", "Save me a seat", "I will join in 10"];

const activitySummary = [
  { label: "Active now", value: "42" },
  { label: "Open threads", value: "6" },
  { label: "Replies today", value: "118" },
];

const initialMessages = [
  {
    id: 1,
    author: "Alex P.",
    initials: "AP",
    mine: false,
    time: "10:36 AM",
    content: "Anyone near Commons right now? Need a real line update before I leave class.",
  },
  {
    id: 2,
    author: "You",
    initials: "ME",
    mine: true,
    time: "10:42 AM",
    content: "I just passed by. Noodle Hub is about 7 minutes, Grill is closer to 15.",
  },
  {
    id: 3,
    author: "Sarah M.",
    initials: "SM",
    mine: false,
    time: "10:44 AM",
    content: "Perfect. Also the spicy tofu bowl is back today. It sold out yesterday.",
  },
  {
    id: 4,
    author: "Leo W.",
    initials: "LW",
    mine: false,
    time: "10:47 AM",
    content: "Pinned this for lunch rush. Drop stall updates here and keep it specific.",
  },
];

const Chat = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [messages, setMessages] = useState(initialMessages);
  const [draft, setDraft] = useState("");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const isDark = theme === "dark";
  const [notificationsCount] = useState(3);

  const activeParticipants = useMemo(
    () => participants.filter((person) => person.status === "online"),
    [],
  );

  const handleSend = (text = draft) => {
    const trimmed = text.trim();
    if (!trimmed) {
      return;
    }

    setMessages((previous) => [
      ...previous,
      {
        id: Date.now(),
        author: "You",
        initials: "ME",
        mine: true,
        time: "now",
        content: trimmed,
      },
    ]);
    setDraft("");
  };

  return (
    <section
      className={`chat-hub-shell ${isSidebarCollapsed ? "chat-hub-shell--sidebar-collapsed" : ""} ${isDark ? "dark" : ""}`}
      aria-label="BiteVerse chat"
    >
      <aside className="chat-hub-sidebar">
        <div className="chat-branding">
          <div className="chat-brand-mark">BV</div>
          {!isSidebarCollapsed && (
            <div className="chat-branding__text">
              <h1>BiteVerse</h1>
              <p>Campus account</p>
            </div>
          )}
          <button
            type="button"
            className="chat-sidebar-toggle"
            onClick={() => setIsSidebarCollapsed((previous) => !previous)}
            aria-label={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isSidebarCollapsed ? ">" : "<"}
          </button>
        </div>

        <nav className="chat-nav" aria-label="Primary">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`chat-nav-item ${location.pathname === item.route ? "active" : ""}`}
              aria-label={item.label}
              title={item.label}
              onClick={() => {
                if (item.route) {
                  navigate(item.route);
                }
              }}
            >
              <span aria-hidden="true" className="chat-nav-item__icon">{item.icon}</span>
              {!isSidebarCollapsed && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        {!isSidebarCollapsed && (
          <button className="chat-sidebar-cta" type="button">
            New Conversation
          </button>
        )}
      </aside>

      <main className="chat-hub-main">
        <header className="chat-topbar">
          <div className="chat-topbar__title-group">
            <span className="chat-kicker">Messages</span>
            <div className="chat-topbar__title-row">
              <h2>Campus Commons</h2>
              <span className="chat-topic-pill">Live lunch thread</span>
            </div>
          </div>

          <div className="chat-topbar__actions">
            <div className="chat-search">
              <span className="chat-search__icon" aria-hidden="true">/</span>
              <input type="text" placeholder="Search messages" aria-label="Search messages" />
            </div>
            <button
              type="button"
              className="chat-icon-button"
              aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
              onClick={toggleTheme}
              title={isDark ? "Switch to light theme" : "Switch to dark theme"}
            >
              {isDark ? (
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="currentColor" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4M12 7a5 5 0 100 10 5 5 0 000-10z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>

            <button type="button" className="chat-icon-button" aria-label="Notifications" title="Notifications">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M13.73 21a2 2 0 01-3.46 0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {notificationsCount > 0 && <span className="notification-badge">{notificationsCount}</span>}
            </button>
          </div>
        </header>

        <div className="chat-workspace">
          <aside className="chat-channel-panel" aria-label="Channels">
            <div className="chat-panel-heading">
              <span>Channels</span>
              <button type="button" aria-label="Add channel">+</button>
            </div>

            <div className="chat-channel-list">
              {channels.map((channel) => (
                <button
                  key={channel.id}
                  type="button"
                  className={`chat-channel ${channel.active ? "active" : ""}`}
                >
                  <span className="chat-channel__name">{channel.name}</span>
                  <span className="chat-channel__meta">{channel.meta}</span>
                </button>
              ))}
            </div>

            <div className="chat-mini-card">
              <strong>Lunch rush</strong>
              <span>Peak window starts in 18 min.</span>
            </div>
          </aside>

          <section className="chat-conversation" aria-label="Conversation">
            <div className="chat-conversation__notice">
              <span>Today</span>
              <p>Share quick stall updates, wait times, and useful recommendations.</p>
            </div>

            <div className="chat-thread">
              {messages.map((message) => (
                <article
                  key={message.id}
                  className={`chat-message ${message.mine ? "chat-message--outgoing" : "chat-message--incoming"}`}
                >
                  {!message.mine && <div className="chat-message__avatar">{message.initials}</div>}
                  <div className="chat-message__body">
                    <div className="chat-message__meta-row">
                      <strong>{message.author}</strong>
                      <time>{message.time}</time>
                    </div>
                    <div className="chat-message__bubble">
                      {message.content}
                    </div>
                  </div>
                  {message.mine && <div className="chat-message__avatar">ME</div>}
                </article>
              ))}
            </div>

            <footer className="chat-footer">
              <div className="chat-quick-actions" aria-label="Quick replies">
                {quickReplies.map((reply) => (
                  <button key={reply} type="button" onClick={() => handleSend(reply)}>
                    {reply}
                  </button>
                ))}
              </div>

              <div className="chat-composer-shell">
                <button type="button" className="chat-composer-shell__plus" aria-label="Add attachment">
                  +
                </button>
                <input
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Write a useful update..."
                  aria-label="Write a message"
                />
                <div className="chat-composer-shell__tools" aria-label="Composer tools">
                  <button type="button">Poll</button>
                  <button type="button">Files</button>
                  <button type="button" className="active">Room</button>
                </div>
                <button type="button" className="chat-composer-shell__send" onClick={() => handleSend()} aria-label="Send message">
                  Send
                </button>
              </div>
            </footer>
          </section>
        </div>

        <Footer variant="chat" compact />
      </main>

      <aside className="chat-hub-right">
        <div className="chat-side-card chat-side-card--members">
          <div className="chat-panel-heading">
            <span>Members</span>
            <strong>{activeParticipants.length} online</strong>
          </div>
          <div className="chat-side-member-list">
            {participants.map((member) => (
              <div key={member.id} className="chat-side-member">
                <div className="chat-side-member__avatar">{member.avatar}</div>
                <div>
                  <strong>{member.name}</strong>
                  <span>{member.role}</span>
                </div>
                <span className={`chat-side-member__dot ${member.status}`} />
              </div>
            ))}
          </div>
        </div>

        <div className="chat-side-card chat-side-card--summary">
          {activitySummary.map((item) => (
            <div key={item.label} className="chat-summary-item">
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>

        <div className="chat-side-card chat-side-card--tip">
          <p className="chat-side-card__label">Thread note</p>
          <p>Keep updates short, current, and tied to a stall so others can act on them quickly.</p>
        </div>
      </aside>
    </section>
  );
};

export default Chat;
