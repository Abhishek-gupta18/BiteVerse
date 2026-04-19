import React, { useMemo, useState } from "react";
import "../../styles/chat.css";

const channelData = [
  {
    id: "general",
    name: "general",
    icon: "#",
    topic: "Daily campus chatter, food finds, and quick updates.",
    unread: 3,
    members: 128,
  },
  {
    id: "food-spots",
    name: "food-spots",
    icon: "FS",
    topic: "Share stalls, hidden gems, and best-value meals.",
    unread: 12,
    members: 84,
  },
  {
    id: "study-breaks",
    name: "study-breaks",
    icon: "SB",
    topic: "Short breaks, playlist swaps, and cozy check-ins.",
    unread: 1,
    members: 61,
  },
  {
    id: "events",
    name: "events",
    icon: "EV",
    topic: "Meetups, tastings, and pop-up announcements.",
    unread: 0,
    members: 47,
  },
];

const memberData = [
  { id: 1, name: "Aarav", role: "Moderator", status: "online", avatar: "A" },
  { id: 2, name: "Meera", role: "Food Explorer", status: "online", avatar: "M" },
  { id: 3, name: "Zoya", role: "Reviewer", status: "away", avatar: "Z" },
  { id: 4, name: "Karan", role: "Student", status: "offline", avatar: "K" },
];

const seedMessages = {
  general: [
    {
      id: 1,
      author: "Aarav",
      time: "10:24 AM",
      content: "Morning check-in: the courtyard cafe has fresh banana bread today.",
      accent: "#d28c50",
    },
    {
      id: 2,
      author: "Meera",
      time: "10:26 AM",
      content: "Perfect. I need a cozy place to work between classes. Anyone else going?",
      accent: "#9c7b5d",
    },
    {
      id: 3,
      author: "You",
      time: "10:28 AM",
      content: "I'll swing by after lunch. If the vibe is good, I'll drop a review here.",
      accent: "#6f8a67",
      mine: true,
    },
  ],
  "food-spots": [
    {
      id: 1,
      author: "Zoya",
      time: "Yesterday",
      content: "New paneer wraps at the west gate stall are surprisingly good and budget-friendly.",
      accent: "#d28c50",
    },
    {
      id: 2,
      author: "Meera",
      time: "Yesterday",
      content: "Added them to the saved list. We should make a best budget meals thread.",
      accent: "#8b6f47",
    },
  ],
  "study-breaks": [
    {
      id: 1,
      author: "Karan",
      time: "Today",
      content: "Quick reset reminder: hydrate, stretch, and then get back to that assignment.",
      accent: "#6f8a67",
    },
    {
      id: 2,
      author: "You",
      time: "Today",
      content: "Posting a 15-minute focus sprint. After that, I'm checking the dessert stall.",
      accent: "#d28c50",
      mine: true,
    },
  ],
  events: [
    {
      id: 1,
      author: "Campus Eats",
      time: "1h ago",
      content: "Pop-up tasting starts Friday at 4 PM near the library lawn. Limited cups, come early.",
      accent: "#a96d4d",
    },
  ],
};

const quickReplies = ["On my way", "Saved it", "Count me in", "Need the menu"];

const Chat = () => {
  const [activeChannel, setActiveChannel] = useState(channelData[0].id);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState(seedMessages);

  const currentChannel = channelData.find((channel) => channel.id === activeChannel);
  const currentMessages = messages[activeChannel] ?? [];

  const activitySummary = useMemo(
    () => [
      { label: "Active now", value: "42", tone: "warm" },
      { label: "Channels", value: "4", tone: "soft" },
      { label: "Replies today", value: "18", tone: "calm" },
    ],
    [],
  );

  const handleSend = (value = draft) => {
    const trimmed = value.trim();

    if (!trimmed) {
      return;
    }

    const nextMessage = {
      id: Date.now(),
      author: "You",
      time: "Just now",
      content: trimmed,
      accent: "#6f8a67",
      mine: true,
    };

    setMessages((previous) => ({
      ...previous,
      [activeChannel]: [...(previous[activeChannel] ?? []), nextMessage],
    }));
    setDraft("");
  };

  return (
    <section className="chat-section" aria-labelledby="chat-section-title">
      <header className="chat-section__header">
        <div>
          <p className="chat-section__eyebrow">Community chat</p>
          <h2 id="chat-section-title">A cozy Discord-inspired hub for BiteVerse</h2>
          <p className="chat-section__description">
            Jump between channels, follow the latest food talk, and keep the conversation
            feeling warm, useful, and alive.
          </p>
        </div>

        <div className="chat-section__stats">
          {activitySummary.map((item) => (
            <article key={item.label} className={`stat-chip stat-chip--${item.tone}`}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </article>
          ))}
        </div>
      </header>

      <div className="chat-layout">
        <aside className="chat-sidebar">
          <div className="chat-sidebar__top">
            <div>
              <p className="chat-sidebar__label">Channels</p>
              <h3>Campus lounge</h3>
            </div>
            <button className="chat-sidebar__action" type="button" aria-label="Create channel">
              +
            </button>
          </div>

          <div className="chat-channel-list" role="listbox" aria-label="Chat channels">
            {channelData.map((channel) => (
              <button
                key={channel.id}
                type="button"
                className={`chat-channel ${activeChannel === channel.id ? "active" : ""}`}
                onClick={() => setActiveChannel(channel.id)}
                aria-pressed={activeChannel === channel.id}
              >
                <span className="chat-channel__icon">{channel.icon}</span>
                <span className="chat-channel__content">
                  <span className="chat-channel__name">#{channel.name}</span>
                  <span className="chat-channel__topic">{channel.topic}</span>
                </span>
                {channel.unread > 0 && <span className="chat-channel__badge">{channel.unread}</span>}
              </button>
            ))}
          </div>

          <div className="chat-sidebar__footer">
            <div className="voice-card">
              <span className="voice-card__pulse" />
              <div>
                <p>Study room</p>
                <small>13 people hanging out</small>
              </div>
            </div>
            <button className="secondary-pill" type="button">
              View all spaces
            </button>
          </div>
        </aside>

        <main className="chat-panel">
          <div className="chat-panel__header">
            <div>
              <p className="chat-panel__channel">#{currentChannel.name}</p>
              <h3>{currentChannel.topic}</h3>
            </div>

            <div className="chat-panel__actions">
              <button type="button" className="icon-pill" aria-label="Search messages">
                S
              </button>
              <button type="button" className="icon-pill" aria-label="Pinned messages">
                P
              </button>
              <button type="button" className="icon-pill" aria-label="Channel info">
                I
              </button>
            </div>
          </div>

          <div className="chat-banner">
            <span>*</span>
            <p>
              Today&apos;s cozy pick: the bakery cart is running a cinnamon roll special until 4 PM.
            </p>
          </div>

          <div className="chat-messages" role="log" aria-live="polite">
            {currentMessages.map((message) => (
              <article key={message.id} className={`message-card ${message.mine ? "mine" : ""}`}>
                <div className="message-card__avatar" style={{ background: message.accent }}>
                  {message.author.charAt(0)}
                </div>
                <div className="message-card__body">
                  <div className="message-card__meta">
                    <strong>{message.author}</strong>
                    <span>{message.time}</span>
                  </div>
                  <p>{message.content}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="chat-composer">
            <div className="chat-composer__toolbar">
              <button type="button" className="composer-pill">
                Media
              </button>
              <button type="button" className="composer-pill">
                Sticker
              </button>
              <button type="button" className="composer-pill">
                Attach
              </button>
            </div>

            <div className="chat-composer__box">
              <textarea
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder={`Message #${currentChannel.name}`}
                rows="1"
              />
              <button type="button" className="send-button" onClick={() => handleSend()}>
                Send
              </button>
            </div>

            <div className="chat-quick-replies" aria-label="Quick replies">
              {quickReplies.map((reply) => (
                <button
                  key={reply}
                  type="button"
                  className="quick-reply"
                  onClick={() => handleSend(reply)}
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>
        </main>

        <aside className="chat-members">
          <div className="chat-members__header">
            <p>People here</p>
            <span>{currentChannel.members} online nearby</span>
          </div>

          <div className="member-list">
            {memberData.map((member) => (
              <div key={member.id} className="member-card">
                <span className={`member-status ${member.status}`} />
                <div className="member-avatar">{member.avatar}</div>
                <div className="member-info">
                  <strong>{member.name}</strong>
                  <span>{member.role}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="chat-tip-card">
            <p className="chat-tip-card__label">Tip</p>
            <p>
              Keep replies short, warm, and useful. This section is designed to feel like a
              calm group hangout, not a noisy feed.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default Chat;
