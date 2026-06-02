import React from 'react';
import { useTheme } from '../context/ThemeContext';

const iconPaths = {
  moon: 'M20 14.5A8 8 0 0 1 9.5 4 8.8 8.8 0 1 0 20 14.5Z',
  sun: 'M12 5V3m0 18v-2M5 12H3m18 0h-2M6.3 6.3 4.9 4.9m14.2 14.2-1.4-1.4m0-11.4 1.4-1.4M4.9 19.1l1.4-1.4M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z',
};

const ThemeRippleButton = ({ className = '', labelPrefix = 'Switch' }) => {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === 'light';

  return (
    <button
      type="button"
      className={`theme-ripple-button ${className}`.trim()}
      onClick={toggleTheme}
      aria-label={`${labelPrefix} to ${isLight ? 'dark' : 'light'} theme`}
      title={`${labelPrefix} to ${isLight ? 'dark' : 'light'} theme`}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d={isLight ? iconPaths.moon : iconPaths.sun} />
      </svg>
    </button>
  );
};

export default ThemeRippleButton;
