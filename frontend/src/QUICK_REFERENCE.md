# 🚀 Dashboard Quick Reference Card

## File Locations

```
components/
├── Sidebar.jsx                   → Left navigation
├── Navbar.jsx                    → Top bar with search
└── sections/
    ├── HeroCard.jsx              → Welcome section
    ├── StreakCard.jsx            → Activity tracker
    ├── RewardsCard.jsx           → Progress tracker
    ├── AchievementsSection.jsx   → Badges
    ├── RecommendedFeed.jsx       → Food grid
    └── ReviewHistorySection.jsx  → Reviews list

styles/
├── Sidebar.css                   → 240 lines
├── Navbar.css                    → 350 lines
├── HeroCard.css                  → 180 lines
├── StreakCard.css                → 210 lines
├── RewardsCard.css               → 200 lines
├── AchievementsSection.css       → 170 lines
├── RecommendedFeed.css           → 280 lines
└── ReviewHistorySection.css      → 340 lines

Dashboard.jsx                      → Main component
Dashboard.css                      → Layout styles (280 lines)
globals.css                        → Global styles (220 lines)
config/dashboardConfig.js          → Theme & config
```

---

## Import Dashboard

```jsx
import Dashboard from './Dashboard'
import './globals.css'

<Dashboard userRole="student" />
```

---

## Customize Colors

### Method 1: Direct CSS
```css
/* In Dashboard.css or globals.css */
body {
  background: linear-gradient(135deg, 
    #YOUR_COLOR1 0%, 
    #YOUR_COLOR2 100%);
}
```

### Method 2: Config
```jsx
import { THEME } from './config/dashboardConfig'
const color = THEME.colors.primary.purple
```

---

## Key Colors

| Name | Color | Use |
|------|-------|-----|
| Primary Purple | `#667eea` | Main accent |
| Dark Purple | `#764ba2` | Gradients |
| Pink | `#f093fb` | Highlights |
| Blue | `#4facfe` | Secondary |
| Cyan | `#00f2fe` | Accents |

---

## Component Props

### Dashboard
```jsx
<Dashboard userRole="student" />
// Options: "student", "teacher", "admin"
```

### Sidebar
```jsx
<Sidebar
  isOpen={true}
  userRole="student"
  userData={{ name, college, level, avatar }}
  onToggle={handleToggle}
/>
```

### HeroCard
```jsx
<HeroCard 
  stats={{ totalReviews, averageRating, pointsEarned }}
  userData={{ name, level }}
/>
```

---

## CSS Classes

### Global Utilities
```css
.gradient-text        /* Gradient text color */
.glass-effect         /* Glassmorphism */
.shadow-lg            /* Large shadow */
.shadow-md            /* Medium shadow */
.shadow-sm            /* Small shadow */
.fade-in              /* Fade animation */
.slide-in             /* Slide animation */
.slide-up             /* Slide up animation */
```

---

## Responsive Breakpoints

```css
/* Mobile First */
@media (max-width: 480px)   /* Small phones */
@media (max-width: 768px)   /* Tablets */
@media (max-width: 1024px)  /* Large tablets */
/* Desktop: default styles */
```

---

## Update Mock Data

```jsx
// In Dashboard.jsx

const userData = {
  name: "Your Name",
  college: "Your College",
  level: 5,
  avatar: "image-url"
}

const stats = {
  totalReviews: 42,
  averageRating: 4.8,
  pointsEarned: 1250,
  currentStreak: 7
}

const recommendedFood = [
  {
    id: 1,
    name: "Dish",
    stall: "Stall",
    image: "url",
    price: "₹100",
    rating: 4.5,
    tag: "Trending"
  }
]
```

---

## Common Customizations

### Change Font Family
```css
/* globals.css */
body {
  font-family: "YourFont", sans-serif;
}
```

### Change Sidebar Width
```css
/* Sidebar.css */
.sidebar {
  width: 300px;  /* Change from 280px */
}
```

### Adjust Animation Speed
```css
/* Component.css */
.element {
  transition: all 0.5s ease;  /* Change from 0.3s */
}
```

### Change Theme Colors
```javascript
// In dashboardConfig.js
export const THEME = {
  colors: {
    primary: {
      purple: "#YOUR_COLOR",
      // ...
    }
  }
}
```

---

## API Integration

### Connect to Backend

```jsx
useEffect(() => {
  const fetchData = async () => {
    const response = await fetch('/api/user/profile')
    const data = await response.json()
    setUserData(data)
  }
  fetchData()
}, [])
```

### API Endpoints to Implement

```javascript
// From dashboardConfig.js
GET    /api/user/profile
GET    /api/user/achievements
GET    /api/user/rewards
GET    /api/food/recommended
GET    /api/reviews/user
POST   /api/reviews/create
GET    /api/notifications
```

---

## Testing Checklist

- [ ] Mobile (375px)
- [ ] Tablet (768px)
- [ ] Desktop (1920px)
- [ ] Touch interactions
- [ ] Keyboard navigation
- [ ] Color contrast
- [ ] Font loading
- [ ] Image loading
- [ ] API calls
- [ ] Error states

---

## Performance Tips

```jsx
// Lazy load heavy components
const Dashboard = React.lazy(() => import('./Dashboard'))

// Optimize images
<img src={url} loading="lazy" alt="desc" />

// Use React.memo for static components
const StatCard = React.memo(({ value }) => (
  <div>{value}</div>
))
```

---

## Deployment

```bash
# Build for production
npm run build

# Preview build
npm run preview

# Deploy to Vercel
vercel

# Deploy to Netlify
netlify deploy --prod
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Styles not working | Clear cache: `rm -rf node_modules && npm install` |
| Images not loading | Check URL validity and CORS |
| Animations lag | Reduce animation duration on mobile |
| Backdrop filter fails | Use CSS fallback: `background-color` |
| Font not loading | Check Google Fonts CDN link |

---

## Keyboard Shortcuts

| Action | Command |
|--------|---------|
| Start dev server | `npm run dev` |
| Build project | `npm run build` |
| DevTools | `F12` or `Ctrl+Shift+I` |
| Responsive view | `Ctrl+Shift+M` |
| Clear cache | `Ctrl+Shift+Delete` |

---

## File Size Summary

| File | Size | Lines |
|------|------|-------|
| Dashboard.jsx | ~3KB | 110 |
| Sidebar.jsx | ~2KB | 70 |
| Navbar.jsx | ~3KB | 110 |
| All CSS | ~15KB | 2400 |
| dashboardConfig.js | ~15KB | 500 |
| Total | ~40KB | 5600+ |

---

## Browser DevTools

### Chrome
1. Open: `F12`
2. Device Mode: `Ctrl+Shift+M`
3. Console: `Ctrl+Shift+J`
4. Sources: `Ctrl+Shift+P` → "Sources"

### Firefox
1. Open: `F12`
2. Responsive: `Ctrl+Shift+M`
3. Console: `Ctrl+Shift+K`

---

## Documentation Files

| File | Purpose |
|------|---------|
| `DASHBOARD_README.md` | Complete documentation |
| `SETUP_GUIDE.md` | Installation & setup |
| `DASHBOARD_INTEGRATION.js` | Integration examples |
| `IMPLEMENTATION_SUMMARY.md` | What's been created |
| `dashboardConfig.js` | Configuration reference |

---

## Color Palette

```
Primary: #667eea
Dark Purple: #764ba2
Pink: #f093fb
Blue: #4facfe
Cyan: #00f2fe

Glass: rgba(30, 30, 45, 0.85)
Text: #ffffff
Secondary: rgba(255, 255, 255, 0.8)
Muted: rgba(255, 255, 255, 0.5)
```

---

## Typography Scale

```
H1: 2.5rem (desktop) / 1.5rem (mobile)
H2: 2rem / 1.2rem
H3: 1.5rem / 1rem
H4: 1.25rem / 0.95rem
Body: 0.95rem / 0.9rem
Small: 0.85rem / 0.8rem
```

---

## Getting Help

1. **Setup Issues**: See `SETUP_GUIDE.md`
2. **Integration**: See `DASHBOARD_INTEGRATION.js`
3. **Customization**: See `DASHBOARD_README.md`
4. **Configuration**: See `dashboardConfig.js`
5. **Code Comments**: Check component files

---

**Version**: 1.0  
**Last Updated**: 2024  
**Status**: Production Ready ✅

---

Need more help? Check the full documentation files! 📚
