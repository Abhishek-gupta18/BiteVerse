// ============================================================
// DASHBOARD THEME & CONFIG
// ============================================================
// Centralized configuration for colors, fonts, and settings

export const THEME = {
  // Primary Colors
  colors: {
    primary: {
      purple: "#667eea",
      darkPurple: "#764ba2",
      pink: "#f093fb",
      blue: "#4facfe",
      cyan: "#00f2fe",
    },
    background: {
      dark: "rgba(30, 30, 45, 0.85)",
      darker: "rgba(20, 20, 32, 0.95)",
      darkest: "rgba(10, 10, 20, 0.98)",
      glass: "rgba(30, 30, 45, 0.6)",
    },
    text: {
      primary: "#ffffff",
      secondary: "rgba(255, 255, 255, 0.8)",
      tertiary: "rgba(255, 255, 255, 0.6)",
      muted: "rgba(255, 255, 255, 0.5)",
    },
    border: {
      light: "rgba(255, 255, 255, 0.1)",
      medium: "rgba(255, 255, 255, 0.2)",
      strong: "rgba(255, 255, 255, 0.3)",
    },
    status: {
      success: "#4CAF50",
      error: "#F44336",
      warning: "#FFC107",
      info: "#2196F3",
    },
  },

  // Gradients
  gradients: {
    primary:
      "linear-gradient(135deg, #667eea, #764ba2)",
    secondary:
      "linear-gradient(135deg, #f093fb, #764ba2)",
    tertiary:
      "linear-gradient(135deg, #4facfe, #00f2fe)",
    background:
      "linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)",
    heroGlass:
      "linear-gradient(135deg, rgba(102, 126, 234, 0.15), rgba(240, 147, 251, 0.15))",
    heroGlassHover:
      "linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(240, 147, 251, 0.2))",
  },

  // Typography
  typography: {
    fontFamily:
      '"Inter", "Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto"',
    fontSize: {
      xs: "0.75rem",
      sm: "0.85rem",
      base: "0.95rem",
      lg: "1.1rem",
      xl: "1.3rem",
      "2xl": "1.5rem",
      "3xl": "2rem",
      "4xl": "2.5rem",
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.6,
    },
  },

  // Spacing
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    "2xl": "2.5rem",
    "3xl": "3rem",
  },

  // Border Radius
  borderRadius: {
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "16px",
    full: "9999px",
  },

  // Box Shadows
  shadows: {
    sm: "0 2px 8px rgba(0, 0, 0, 0.08)",
    md: "0 6px 20px rgba(0, 0, 0, 0.1)",
    lg: "0 8px 32px rgba(0, 0, 0, 0.15)",
    xl: "0 12px 40px rgba(0, 0, 0, 0.2)",
    glow: "0 0 15px rgba(102, 126, 234, 0.3)",
    glowLg: "0 0 20px rgba(102, 126, 234, 0.5)",
  },

  // Breakpoints
  breakpoints: {
    xs: "320px",
    sm: "480px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },

  // Transitions
  transitions: {
    fast: "0.15s ease",
    base: "0.3s ease",
    slow: "0.5s ease",
    slower: "1s ease",
  },

  // Z-index
  zIndex: {
    hide: -1,
    base: 0,
    dropdown: 100,
    sticky: 150,
    navbar: 150,
    overlay: 200,
    sidebar: 200,
    toast: 9999,
    modal: 10000,
  },
};

// ============================================================
// COMPONENT SIZES
// ============================================================

export const COMPONENT_SIZES = {
  sidebar: {
    width: "280px",
    collapsedWidth: "80px",
  },
  navbar: {
    height: "70px",
  },
  card: {
    borderRadius: "16px",
    padding: "1.5rem",
  },
  button: {
    sm: {
      padding: "0.5rem 1rem",
      height: "32px",
    },
    md: {
      padding: "0.75rem 1.5rem",
      height: "40px",
    },
    lg: {
      padding: "1rem 2rem",
      height: "48px",
    },
  },
};

// ============================================================
// ANIMATION CONFIGURATIONS
// ============================================================

export const ANIMATIONS = {
  floatDown: {
    keyframes: `
      @keyframes floatDown {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(20px) rotate(5deg); }
      }
    `,
    duration: "6s",
    timingFunction: "ease-in-out",
  },
  shimmer: {
    keyframes: `
      @keyframes shimmer {
        0% { left: -100%; }
        50%, 100% { left: 100%; }
      }
    `,
    duration: "3s",
  },
  pulse: {
    keyframes: `
      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
      }
    `,
    duration: "4s",
  },
  gradientMove: {
    keyframes: `
      @keyframes gradientMove {
        0% { background-position: 0%; }
        50% { background-position: 100%; }
        100% { background-position: 0%; }
      }
    `,
    duration: "2s",
  },
};

// ============================================================
// RESPONSIVE UTILITIES
// ============================================================

export const RESPONSIVE = {
  media: {
    xs: `@media (max-width: 480px)`,
    sm: `@media (max-width: 640px)`,
    md: `@media (max-width: 768px)`,
    lg: `@media (max-width: 1024px)`,
    xl: `@media (max-width: 1280px)`,
    "2xl": `@media (max-width: 1536px)`,
  },
  container: {
    xs: "100%",
    sm: "540px",
    md: "720px",
    lg: "960px",
    xl: "1140px",
    "2xl": "1320px",
  },
};

// ============================================================
// NOTIFICATION TYPES
// ============================================================

export const NOTIFICATION_TYPES = {
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
  INFO: "info",
};

// ============================================================
// USER ROLES
// ============================================================

export const USER_ROLES = {
  STUDENT: "student",
  TEACHER: "teacher",
  ADMIN: "admin",
  SUPERADMIN: "superadmin",
};

// ============================================================
// NAVIGATION ITEMS
// ============================================================

export const NAVIGATION_ITEMS = {
  [USER_ROLES.STUDENT]: [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "explore", label: "Explore Food", icon: "🍽️" },
    { id: "reviews", label: "Reviews", icon: "⭐" },
    { id: "rewards", label: "Rewards", icon: "🏆" },
    { id: "leaderboard", label: "Leaderboard", icon: "🥇" },
    { id: "community", label: "Community", icon: "👥" },
    { id: "chats", label: "Messages", icon: "💬" },
  ],
  [USER_ROLES.TEACHER]: [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "analytics", label: "Analytics", icon: "📈" },
    { id: "manage", label: "Manage Content", icon: "📝" },
    { id: "students", label: "Students", icon: "👥" },
    { id: "messages", label: "Messages", icon: "💬" },
  ],
  [USER_ROLES.ADMIN]: [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "analytics", label: "Analytics", icon: "📈" },
    { id: "users", label: "Manage Users", icon: "👥" },
    { id: "content", label: "Manage Content", icon: "📝" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ],
};

// ============================================================
// API ENDPOINTS (Update with your actual endpoints)
// ============================================================

export const API_ENDPOINTS = {
  USER: {
    PROFILE: "/api/user/profile",
    ACHIEVEMENTS: "/api/user/achievements",
    REWARDS: "/api/user/rewards",
    STATS: "/api/user/stats",
  },
  FOOD: {
    RECOMMENDED: "/api/food/recommended",
    SEARCH: "/api/food/search",
    DETAILS: "/api/food/:id",
  },
  REVIEWS: {
    USER: "/api/reviews/user",
    CREATE: "/api/reviews/create",
    LIKE: "/api/reviews/:id/like",
    COMMENT: "/api/reviews/:id/comment",
  },
  NOTIFICATIONS: {
    GET: "/api/notifications",
    MARK_READ: "/api/notifications/mark-read",
  },
  STALLS: {
    ALL: "/api/stalls",
    DETAILS: "/api/stalls/:id",
  },
};

// ============================================================
// MOCK DATA TEMPLATES
// ============================================================

export const MOCK_TEMPLATES = {
  userData: {
    name: "User Name",
    email: "user@college.edu",
    college: "College Name",
    level: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=default",
  },
  stats: {
    totalReviews: 42,
    averageRating: 4.8,
    pointsEarned: 1250,
    currentStreak: 7,
  },
  foodItem: {
    id: 1,
    name: "Dish Name",
    stall: "Stall Name",
    image: "https://images.unsplash.com/photo-bucket",
    price: "₹100",
    rating: 4.5,
    tag: "Trending",
  },
  review: {
    id: 1,
    foodName: "Dish Name",
    stallName: "Stall Name",
    image: "https://images.unsplash.com/photo-bucket",
    rating: 5.0,
    review: "Amazing food!",
    tags: ["Healthy"],
    timestamp: "2 days ago",
  },
};

// ============================================================
// UTILITY FUNCTIONS
// ============================================================

/**
 * Get CSS variable value
 * @param {string} colorKey - Color key from THEME.colors
 * @returns {string} Color value
 */
export const getColor = (colorKey) => {
  const keys = colorKey.split(".");
  let color = THEME.colors;
  keys.forEach((key) => {
    color = color[key];
  });
  return color;
};

/**
 * Get responsive breakpoint
 * @param {string} breakpoint - Breakpoint name
 * @returns {string} Media query
 */
export const getBreakpoint = (breakpoint) => {
  return RESPONSIVE.media[breakpoint];
};

/**
 * Combine multiple gradient colors
 * @param {Array<string>} colors - Array of color values
 * @returns {string} Gradient string
 */
export const createGradient = (colors) => {
  return `linear-gradient(135deg, ${colors.join(", ")})`;
};

// ============================================================
// EXPORT DEFAULT CONFIG
// ============================================================

export default {
  THEME,
  COMPONENT_SIZES,
  ANIMATIONS,
  RESPONSIVE,
  NOTIFICATION_TYPES,
  USER_ROLES,
  NAVIGATION_ITEMS,
  API_ENDPOINTS,
  MOCK_TEMPLATES,
};
