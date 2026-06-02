import React, { createContext, useContext, useState, useEffect } from 'react';
import { flushSync } from 'react-dom';

const ThemeContext = createContext();

const getStoredTheme = () => {
  try {
    return localStorage.getItem('theme');
  } catch {
    return null;
  }
};

const getSystemTheme = () => {
  try {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  } catch {
    // Ignore browsers or environments that block media queries.
  }

  return 'light';
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = getStoredTheme();
    if (savedTheme) return savedTheme;

    return getSystemTheme();
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('theme', theme);
    } catch {
      // Ignore storage failures and keep rendering.
    }
  }, [theme]);

  const getRippleOrigin = (event) => {
    if (!event?.currentTarget) {
      return {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      };
    }

    const rect = event.currentTarget.getBoundingClientRect();

    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
  };

  const createFallbackRipple = ({ x, y, radius }) => {
    const ripple = document.createElement('span');
    ripple.className = 'theme-ripple-fallback';
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.width = `${radius * 2}px`;
    ripple.style.height = `${radius * 2}px`;

    document.body.appendChild(ripple);
    window.requestAnimationFrame(() => ripple.classList.add('active'));
    window.setTimeout(() => ripple.remove(), 780);
  };

  const toggleTheme = (event) => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    const { x, y } = getRippleOrigin(event);
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );
    const duration = Math.min(920, Math.max(620, endRadius * 0.72));

    if (!document.startViewTransition) {
      createFallbackRipple({ x, y, radius: endRadius });
      window.setTimeout(() => setTheme(nextTheme), 160);
      return;
    }

    document.documentElement.classList.add('theme-ripple-active');

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        setTheme(nextTheme);
      });
    });

    transition.ready
      .then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration,
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
            pseudoElement: '::view-transition-new(root)',
          },
        );
      })
      .finally(() => {
        window.setTimeout(() => {
          document.documentElement.classList.remove('theme-ripple-active');
        }, duration);
      });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => { // eslint-disable-line react-refresh/only-export-components
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
