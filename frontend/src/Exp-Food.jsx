import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import Footer from './components/Footer';
import './styles/Exp-Food.css';

const filters = [
  { id: 'all', label: 'All' },
  { id: 'nearMe', label: 'Near me' },
  { id: 'spicy', label: 'Spicy' },
  { id: 'budget', label: 'Budget' },
  { id: 'veg', label: 'Veg' },
  { id: 'openNow', label: 'Open now' },
  { id: 'topRated', label: 'Top rated' },
];

const trendingItems = [
  {
    name: 'Inferno Ramen',
    stall: 'Noodle Hub',
    rating: '4.9',
    badge: 'Hot',
    badgeTone: 'hot',
    filters: ['spicy', 'openNow', 'topRated'],
    description: 'Late-night heat with the shortest queue on the east side.',
  },
  {
    name: 'Crisp Seoul',
    stall: 'K-Bites',
    rating: '4.7',
    badge: 'Live buzz',
    badgeTone: 'buzz',
    filters: ['budget', 'nearMe', 'openNow', 'topRated'],
    description: 'Affordable bowls with a steady campus crowd all day.',
  },
  {
    name: 'Miso Smash',
    stall: 'Campus Cafe',
    rating: '4.5',
    badge: 'New',
    badgeTone: 'new',
    filters: ['veg', 'nearMe', 'budget'],
    description: 'A lighter crowd-pleaser that lands well for lunch breaks.',
  },
];

const outlets = [
  {
    name: 'Main Campus Canteen',
    meta: 'North Block · 24 dishes · 4.6 avg',
    rating: '4.6',
    wait: '~5 min',
    waitTone: 'fast',
    filters: ['nearMe', 'budget', 'openNow'],
  },
  {
    name: 'Noodle Hub',
    meta: 'East Gate · 12 dishes · 4.8 avg',
    rating: '4.8',
    wait: '~12 min',
    waitTone: 'medium',
    filters: ['spicy', 'openNow', 'topRated'],
  },
  {
    name: 'The Brew Corner',
    meta: 'Library Block · 8 items · 4.4 avg',
    rating: '4.4',
    wait: '~3 min',
    waitTone: 'fast',
    filters: ['nearMe', 'veg', 'budget'],
  },
];

const feedItems = [
  {
    initials: 'AK',
    name: 'Aarav K.',
    time: '2m ago',
    live: true,
    text: 'The ramen line is moving fast right now. Got mine in 4 mins. Absolutely worth it!',
    likes: 24,
    replies: 6,
    tone: 'blue',
  },
  {
    initials: 'MY',
    name: 'Maya Y.',
    time: '8m ago',
    text: 'Try the spicy tofu rice bowl at K-Bites. It is underrated and only ₹60!',
    likes: 41,
    replies: 11,
    tone: 'green',
  },
];

const matchesFilter = (item, activeFilter, searchTerm) => {
  const searchableText = [item.name, item.stall, item.meta, item.text, item.description, item.badge]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  const matchesSearch = !searchTerm || searchableText.includes(searchTerm);
  const matchesSelectedFilter =
    activeFilter === 'all' ||
    item.filters?.includes(activeFilter) ||
    (activeFilter === 'topRated' && Number.parseFloat(item.rating) >= 4.7);

  return matchesSearch && matchesSelectedFilter;
};

const ExpFood = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const filterRowRef = useRef(null);
  const filterButtonRefs = useRef({});
  const [sliderStyle, setSliderStyle] = useState({ opacity: 0, width: 0, transform: 'translateX(0px)' });

  const normalizedSearch = searchTerm.trim().toLowerCase();
  const filteredTrendingItems = useMemo(
    () => trendingItems.filter((item) => matchesFilter(item, activeFilter, normalizedSearch)),
    [activeFilter, normalizedSearch],
  );

  const filteredOutlets = useMemo(
    () => outlets.filter((item) => matchesFilter(item, activeFilter, normalizedSearch)),
    [activeFilter, normalizedSearch],
  );

  const filteredFeedItems = useMemo(
    () => feedItems.filter((item) => matchesFilter(item, activeFilter, normalizedSearch)),
    [activeFilter, normalizedSearch],
  );

  const updateSlider = () => {
    const rowElement = filterRowRef.current;
    const activeButton = filterButtonRefs.current[activeFilter];

    if (!rowElement || !activeButton) {
      return;
    }

    setSliderStyle({
      opacity: 1,
      width: `${activeButton.offsetWidth}px`,
      transform: `translateX(${activeButton.offsetLeft}px)`,
    });
  };

  useLayoutEffect(() => {
    updateSlider();
  }, [activeFilter]);

  useEffect(() => {
    window.addEventListener('resize', updateSlider);

    return () => {
      window.removeEventListener('resize', updateSlider);
    };
  }, [activeFilter]);

  return (
    <main className="exp-food-page" aria-label="Explore food">
      <section className="exp-food-shell">
        <div className="exp-search" role="search">
          <span aria-hidden="true" className="exp-search__icon">⌕</span>
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search dishes, stalls, cuisines..."
            aria-label="Search dishes, stalls, cuisines"
          />
        </div>

        <div className="exp-filter-row" aria-label="Food filters" ref={filterRowRef}>
          <span className="exp-filter-slider" aria-hidden="true" style={sliderStyle} />
          {filters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              className={`exp-chip ${activeFilter === filter.id ? 'active' : ''}`}
              ref={(element) => {
                if (element) {
                  filterButtonRefs.current[filter.id] = element;
                }
              }}
              onClick={() => setActiveFilter(filter.id)}
              aria-pressed={activeFilter === filter.id}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <section className="exp-section">
          <h2>TRENDING RIGHT NOW</h2>
          <div className="exp-trending-grid">
            {filteredTrendingItems.length ? filteredTrendingItems.map((item) => (
              <article key={item.name} className="exp-trend-card exp-slide-in" style={{ animationDelay: `${filteredTrendingItems.indexOf(item) * 90}ms` }}>
                <div className="exp-card-media">
                  <span aria-hidden="true">□</span>
                </div>
                <span className={`exp-badge exp-badge--${item.badgeTone}`}>{item.badge}</span>
                <div className="exp-card-bottom">
                  <div>
                    <h3>{item.name}</h3>
                    <p>{item.stall}</p>
                  </div>
                  <span className="exp-rating">□ {item.rating}</span>
                </div>
                <p className="exp-card-description">{item.description}</p>
                <button type="button" className="exp-card-action">See similar picks</button>
              </article>
            )) : <div className="exp-empty-state">No trending dishes match this filter.</div>}
          </div>
        </section>

        <section className="exp-map-card exp-slide-in exp-slide-in--slow" aria-label="Campus food map">
          <span aria-hidden="true">□</span>
          <strong>Campus food map</strong>
          <p>12 stalls open now · tap to explore</p>
        </section>

        <section className="exp-section">
          <h2>FOOD OUTLETS</h2>
          <div className="exp-outlet-list">
            {filteredOutlets.length ? filteredOutlets.map((outlet) => (
              <article key={outlet.name} className="exp-outlet-card">
                <div className="exp-outlet-icon" aria-hidden="true">□</div>
                <div className="exp-outlet-copy">
                  <h3>{outlet.name}</h3>
                  <p>{outlet.meta}</p>
                </div>
                <div className="exp-outlet-meta">
                  <span className="exp-rating">□ {outlet.rating}</span>
                  <span className={`exp-wait exp-wait--${outlet.waitTone}`}>{outlet.wait}</span>
                </div>
                <button type="button" className="exp-inline-link">Open menu</button>
              </article>
            )) : <div className="exp-empty-state">No outlets match this filter.</div>}
          </div>
        </section>

        <section className="exp-section exp-feed-section">
          <h2>COMMUNITY FEED</h2>
          <div className="exp-feed-list">
            {filteredFeedItems.length ? filteredFeedItems.map((item) => (
              <article key={item.name} className="exp-feed-card">
                <div className={`exp-avatar exp-avatar--${item.tone}`}>{item.initials}</div>
                <div className="exp-feed-content">
                  <div className="exp-feed-top">
                    <div className="exp-feed-author">
                      <h3>{item.name}</h3>
                      {item.live ? <span>Live</span> : null}
                    </div>
                    <time>{item.time}</time>
                  </div>
                  <p>{item.text}</p>
                  <div className="exp-feed-actions" aria-label={`${item.name} engagement`}>
                    <button type="button">□ <span>{item.likes}</span></button>
                    <button type="button">□ <span>{item.replies}</span></button>
                    <button type="button">□ <span>Share</span></button>
                  </div>
                </div>
              </article>
            )) : <div className="exp-empty-state">No community posts match this filter.</div>}
          </div>
        </section>

        <button type="button" className="exp-review-cta">
          <span aria-hidden="true">□</span>
          <span>
            <strong>Write a review</strong>
            <small>Earn XP + help your campus community</small>
          </span>
          <span aria-hidden="true">□</span>
        </button>

        <Footer variant="dashboard" />
      </section>
    </main>
  );
};

export default ExpFood;
