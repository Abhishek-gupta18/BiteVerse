import React, { useEffect, useMemo, useState } from "react";
import "../../styles/chat.css";

const navItems = [
  { id: "dashboard", label: "Dashboard", active: true },
  { id: "messages", label: "Messages" },
  { id: "groups", label: "Groups" },
  { id: "library", label: "Library" },
  { id: "settings", label: "Settings" },
];

function Icon({ name }) {
  // simple inline SVGs to ensure consistent visibility across platforms
  switch (name) {
    case "dashboard":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor">
          <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zM13 21h8v-10h-8v10zm0-18v6h8V3h-8z" />
        </svg>
      );
    case "messages":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor">
          <path d="M4 4h16v10H7l-3 3V4z" />
        </svg>
      );
    case "groups":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor">
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5C13 14.17 8.33 13 6 13zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
        </svg>
      );
    case "library":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor">
          <path d="M4 19V5a1 1 0 0 1 1-1h3v16H5a1 1 0 0 1-1-1zM10 4h9v16h-9V4z" />
        </svg>
      );
    case "settings":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor">
          <path d="M12 15.5A3.5 3.5 0 1 0 12 8.5a3.5 3.5 0 0 0 0 7z" />
          <path d="M19.4 15a1.8 1.8 0 0 0 .2 1.9l.1.1a1 1 0 0 1-1.4 1.4l-.1-.1a1.8 1.8 0 0 0-1.9-.2 1.8 1.8 0 0 0-1 1.6V20a1 1 0 0 1-2 0v-.2a1.8 1.8 0 0 0-1-1.6 1.8 1.8 0 0 0-1.9.2l-.1.1a1 1 0 0 1-1.4-1.4l.1-.1a1.8 1.8 0 0 0 .2-1.9 1.8 1.8 0 0 0-1.6-1H4a1 1 0 0 1 0-2h.2a1.8 1.8 0 0 0 1.6-1 1.8 1.8 0 0 0-.2-1.9l-.1-.1A1 1 0 0 1 6.6 4l.1.1a1.8 1.8 0 0 0 1.9.2h.1A1.8 1.8 0 0 0 10 3.2V3a1 1 0 0 1 2 0v.2c.2.6.6 1 1 1.2h.1a1.8 1.8 0 0 0 1.9-.2l.1-.1A1 1 0 0 1 18 4.6l-.1.1a1.8 1.8 0 0 0-.2 1.9v.1c.3.4.8.8 1.4 1H20a1 1 0 0 1 0 2h-.2c-.6.2-1 .6-1.4 1v.1c.2.6.6 1 1 1.6z" />
        </svg>
      );
    default:
      return null;
  }
}

const people = [
  { id: 1, name: "Alex P.", status: "online", accent: "#ff7a1a" },
  { id: 2, name: "Sarah M.", status: "online", accent: "#c46a2a" },
  { id: 3, name: "Jordan K.", status: "away", accent: "#8b5cf6" },
  { id: 4, name: "Leo W.", status: "online", accent: "#ff8d1f" },
];

const participants = [
  { id: 1, name: "Alex P.", avatar: "AP", active: true },
  { id: 2, name: "Sarah M.", avatar: "SM", active: true },
  { id: 3, name: "Jordan K.", avatar: "JK", active: false },
  { id: 4, name: "Leo W.", avatar: "LW", active: true },
];

const quickReplies = ["Got it! 👍", "On my way 🏃‍♂️", "Can't talk now 🙊"];

const memberCards = [
  { id: 1, name: "Aarav", role: "Moderator", status: "online" },
  { id: 2, name: "Meera", role: "Food Explorer", status: "online" },
  { id: 3, name: "Zoya", role: "Reviewer", status: "away" },
  { id: 4, name: "Karan", role: "Student", status: "offline" },
];

const activitySummary = [
  { label: "Active now", value: "42" },
  { label: "Channels", value: "4" },
  { label: "Replies today", value: "18" },
];

const paletteSets = [
  {
    sentBg: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
    sentFg: "#f8fbff",
    receivedBg: "rgba(227, 239, 255, 0.95)",
    receivedFg: "#16335d",
  },
  {
    sentBg: "linear-gradient(135deg, #ec4899 0%, #db2777 100%)",
    sentFg: "#fff8fd",
    receivedBg: "rgba(252, 232, 243, 0.96)",
    receivedFg: "#6b123f",
  },
  {
    sentBg: "linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)",
    sentFg: "#f2fffd",
    receivedBg: "rgba(225, 245, 243, 0.96)",
    receivedFg: "#164e4c",
  },
  {
    sentBg: "linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)",
    sentFg: "#fbf8ff",
    receivedBg: "rgba(237, 230, 255, 0.96)",
    receivedFg: "#3b1670",
  },
  {
    sentBg: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
    sentFg: "#fffaf6",
    receivedBg: "rgba(255, 240, 224, 0.98)",
    receivedFg: "#7c2d12",
  },
  {
    sentBg: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
    sentFg: "#f6fcff",
    receivedBg: "rgba(224, 244, 255, 0.96)",
    receivedFg: "#0c4a6e",
  },
];

const getLocalDayKey = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
};

const getPaletteForDay = (dayKey) => {
  let hash = 0;

  for (const character of dayKey) {
    hash = (hash * 31 + character.charCodeAt(0)) >>> 0;
  }

  return paletteSets[hash % paletteSets.length];
};

const initialMessages = [
  {
    id: 1,
    author: "Alex P.",
    initials: "AP",
    role: "ALEX P.",
    mine: false,
    time: "",
    bubble: "bubble-in",
    accent: "#d28c50",
    content:
      "Hey everyone! Has anyone started on the Quantum Mechanics assignment? I'm stuck on the third problem. 🤯",
  },
  {
    id: 2,
    author: "You",
    initials: "ME",
    role: "You",
    mine: true,
    time: "10:42 AM",
    bubble: "bubble-out",
    accent: "#ff7400",
    content:
      "I just finished it! The trick is to use the Schrödinger equation in its time-independent form first. Want to jump in the voice room? 🚀",
  },
  {
    id: 3,
    author: "Sarah M.",
    initials: "SM",
    role: "SARAH M.",
    mine: false,
    time: "",
    bubble: "bubble-in",
    accent: "#b56d4c",
    content: "Omg yes please, I've been staring at it for hours.",
  },
  {
    id: 4,
    author: "Sarah M.",
    initials: "SM",
    role: "SARAH M.",
    mine: false,
    time: "",
    bubble: "bubble-in",
    accent: "#c07a4b",
    content: "Is it the one about the potential barrier?",
  },
];

const Chat = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [draft, setDraft] = useState("");
  const [dayKey, setDayKey] = useState(() => getLocalDayKey());
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    try {
      return localStorage.getItem("eduhub-dark") === "1";
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("eduhub-dark", isDark ? "1" : "0");
    } catch (e) {
      /* ignore */
    }
  }, [isDark]);

  useEffect(() => {
    let cancelled = false;
    let timeoutId;

    const scheduleNextUpdate = () => {
      if (cancelled) {
        return;
      }

      const now = new Date();
      const nextMidnight = new Date(now);
      nextMidnight.setHours(24, 0, 0, 0);

      timeoutId = window.setTimeout(() => {
        if (cancelled) {
          return;
        }

        setDayKey(getLocalDayKey());
        scheduleNextUpdate();
      }, nextMidnight.getTime() - now.getTime());
    };

    scheduleNextUpdate();
    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, []);

  const chatPalette = useMemo(() => getPaletteForDay(dayKey), [dayKey]);

  const chatPaletteStyle = {
    "--chat-sent-bg": chatPalette.sentBg,
    "--chat-sent-fg": chatPalette.sentFg,
    "--chat-received-bg": chatPalette.receivedBg,
    "--chat-received-fg": chatPalette.receivedFg,
  };

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
        role: "You",
        mine: true,
        time: "10:42 AM",
        bubble: "bubble-out",
        accent: "#ff7400",
        content: trimmed,
      },
    ]);
    setDraft("");
  };

  return (
    <section
      className={`chat-hub-shell ${isSidebarCollapsed ? "chat-hub-shell--sidebar-collapsed" : ""} ${isDark ? "dark" : ""}`}
      aria-label="Chat hub"
      style={chatPaletteStyle}
    >
      <aside className="chat-hub-sidebar">
        <div className="chat-branding chat-branding--with-toggle">
          <div className="chat-branding__text">
            <h1>EduHub</h1>
            <p>Student Account</p>
          </div>
          <button
            type="button"
            className="chat-sidebar-toggle"
            onClick={() => setIsSidebarCollapsed((previous) => !previous)}
            aria-label={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-pressed={isSidebarCollapsed}
          >
            {isSidebarCollapsed ? "▸" : "◂"}
          </button>
        </div>

        <nav className="chat-nav" aria-label="Primary">
          {navItems.map((item) => (
            <button key={item.id} type="button" className={`chat-nav-item ${item.active ? "active" : ""}`} aria-label={item.label} data-label={item.label}>
              <span aria-hidden="true" className="chat-nav-item__icon"><Icon name={item.id} /></span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <button className="chat-sidebar-cta" type="button">
          New Conversation
        </button>
      </aside>

      <main className="chat-hub-main">
        <header className="chat-topbar">
          <div className="chat-topbar__title-group">
            <div className="chat-topbar__title-row">
              <h2>Chat Hub</h2>
              <span className="chat-topic-pill">PHYSICS 101</span>
            </div>

            <div className="chat-search">
              <span className="chat-search__icon" aria-hidden="true">⌕</span>
              <input type="text" placeholder="Search in chat..." aria-label="Search in chat" />
            </div>
          </div>

          <div className="chat-topbar__actions">
            <div className="chat-avatar-stack" aria-label="Active participants">
              {people.slice(0, 3).map((person) => (
                <span key={person.id} className="chat-avatar-stack__item" style={{ borderColor: person.accent }}>
                  {person.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </span>
              ))}
              <span className="chat-avatar-stack__more">+12</span>
            </div>
            <button
              type="button"
              className="chat-icon-button chat-theme-toggle"
              aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
              aria-pressed={isDark}
              onClick={() => setIsDark((p) => !p)}
            >
              {isDark ? "☀" : "🌙"}
            </button>
            <button type="button" className="chat-icon-button" aria-label="Notifications">⌁</button>
            <button type="button" className="chat-icon-button" aria-label="Add person">⌄</button>
            <button type="button" className="chat-icon-button" aria-label="More options">⋮</button>
          </div>
        </header>

        <section className="chat-people-strip" aria-label="Participants">
          {participants.map((person) => (
            <div key={person.id} className="chat-person-card">
              <div className={`chat-person-card__avatar ${person.active ? "active" : ""}`}>{person.avatar}</div>
              <span>{person.name}</span>
            </div>
          ))}
        </section>

        <section className="chat-thread" aria-label="Conversation">
          {messages.map((message) => (
            <article
              key={message.id}
              className={`chat-message ${message.mine ? "chat-message--outgoing" : "chat-message--incoming"}`}
            >
              {!message.mine && <div className="chat-message__avatar chat-message__avatar--round">{message.initials}</div>}
              <div className={`chat-message__body ${message.mine ? "chat-message__body--right" : ""}`}>
                {!message.mine && <span className="chat-message__author">{message.role}</span>}
                <div className={`chat-message__bubble ${message.bubble} ${message.mine ? "chat-message__bubble--primary" : "glass-card"}`}>
                  {message.content}
                </div>
                {message.mine && (
                  <div className="chat-message__meta">
                    <span>{message.time}</span>
                    <span>✓✓</span>
                  </div>
                )}
              </div>
              {message.mine && <div className="chat-message__avatar chat-message__avatar--round">{message.initials}</div>}
            </article>
          ))}
        </section>

        <footer className="chat-footer">
          <div className="chat-quick-actions" aria-label="Quick replies">
            {quickReplies.map((reply) => (
              <button key={reply} type="button" className="chat-quick-actions__pill" onClick={() => handleSend(reply)}>
                {reply}
              </button>
            ))}
          </div>

          <div className="chat-composer-shell">
            <button type="button" className="chat-composer-shell__plus" aria-label="Add attachment">
              ＋
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
              placeholder="Type a message to the hub..."
              aria-label="Type a message to the hub"
            />

            <div className="chat-composer-shell__tools" aria-label="Composer tools">
              <button type="button" className="chat-composer-shell__tool">
                ◫ <span>Quick Poll</span>
              </button>
              <button type="button" className="chat-composer-shell__tool">
                ▣ <span>Shared Files</span>
              </button>
              <button type="button" className="chat-composer-shell__tool chat-composer-shell__tool--active">
                🎙 <span>Voice Room</span>
              </button>
              <button type="button" className="chat-composer-shell__tool">
                ✎ <span>Whiteboard</span>
              </button>
            </div>

            <button type="button" className="chat-composer-shell__send" onClick={() => handleSend()} aria-label="Send message">
              ▶
            </button>
          </div>
        </footer>
      </main>

      <aside className="chat-hub-right">
        <div className="chat-side-card">
          <p className="chat-side-card__label">Members</p>
          <div className="chat-side-member-list">
            {memberCards.map((member) => (
              <div key={member.id} className="chat-side-member">
                <span className={`chat-side-member__dot ${member.status}`} />
                <div>
                  <strong>{member.name}</strong>
                  <span>{member.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="chat-side-card chat-side-card--tip">
          <p className="chat-side-card__label">Tip</p>
          <p>Keep replies short, warm, and useful. This layout is tuned to feel like a calm group hangout.</p>
        </div>

        <div className="chat-side-card chat-side-card--summary">
          {activitySummary.map((item) => (
            <div key={item.label} className="chat-summary-item">
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </aside>
    </section>
  );
};

export default Chat;
