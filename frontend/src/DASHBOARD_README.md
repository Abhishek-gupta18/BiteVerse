# 🍽️ Campus Dining Dashboard UI

A modern, vibrant student/teacher/user dashboard for campus dining applications. Built with React and featuring a glassmorphism design with smooth animations.

## ✨ Features

- **Modern UI Design**: Glassmorphism effects with blur, shadows, and modern gradients
- **Responsive Layout**: Fully responsive from mobile to desktop
- **Interactive Components**: Smooth hover effects and animations
- **Dark Mode**: Beautiful dark theme with vibrant accent colors
- **Modular Architecture**: Reusable components for easy customization
- **Accessibility**: Semantic HTML and keyboard-friendly interactions
- **Performance Optimized**: Lightweight CSS with efficient animations

## 📂 Project Structure

```
frontend/src/
├── Dashboard.jsx                 # Main dashboard component
├── Dashboard.css                 # Dashboard layout styles
├── globals.css                   # Global styles and utilities
├── components/
│   ├── Sidebar.jsx              # Left navigation sidebar
│   ├── Navbar.jsx               # Top navigation bar
│   └── sections/
│       ├── HeroCard.jsx          # Welcome hero section
│       ├── StreakCard.jsx        # Weekly activity tracker
│       ├── RewardsCard.jsx       # Rewards progress card
│       ├── AchievementsSection.jsx  # Badges display
│       ├── RecommendedFeed.jsx   # Food recommendations grid
│       └── ReviewHistorySection.jsx # User reviews list
└── styles/
    ├── Sidebar.css
    ├── Navbar.css
    ├── HeroCard.css
    ├── StreakCard.css
    ├── RewardsCard.css
    ├── AchievementsSection.css
    ├── RecommendedFeed.css
    └── ReviewHistorySection.css
```

## 🚀 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup

1. **Install dependencies**:
```bash
cd frontend
npm install
```

2. **Install additional fonts** (recommended):
```bash
npm install --save @fontsource/inter @fontsource/poppins
```

Or add to your `index.html`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```

3. **Import in your main component**:
```jsx
import Dashboard from './Dashboard';
import './globals.css';

function App() {
  return <Dashboard userRole="student" />;
}

export default App;
```

4. **Start the development server**:
```bash
npm run dev
```

## 🎨 Customization

### Colors & Gradients

Edit the color values in each CSS file. Primary colors:
- Primary Purple: `#667eea`
- Secondary Purple: `#764ba2`
- Pink Accent: `#f093fb`
- Blue Accent: `#4facfe`
- Cyan Accent: `#00f2fe`

### Font Adjustment

Change in `globals.css`:
```css
body {
  font-family: "YourFont", "Fallback", sans-serif;
}
```

### Component Props

#### Dashboard Component
```jsx
<Dashboard 
  userRole="student" // or "teacher", "admin"
/>
```

#### Sidebar Component
```jsx
<Sidebar
  isOpen={true}
  userRole="student"
  userData={{
    name: "Your Name",
    college: "Your College",
    level: 5,
    avatar: "url"
  }}
  onToggle={handleToggle}
/>
```

### Mock Data Customization

Edit the mock data in `Dashboard.jsx`:

```jsx
// Update user data
const userData = {
  name: "Your Name",
  college: "Your College",
  level: 10,
  avatar: "your-image-url"
};

// Update statistics
const stats = {
  totalReviews: 50,
  averageRating: 4.9,
  pointsEarned: 2000,
  currentStreak: 10
};

// Update recommended food items
const recommendedFood = [
  {
    id: 1,
    name: "Dish Name",
    stall: "Stall Name",
    image: "image-url",
    price: "₹100",
    rating: 4.5,
    tag: "Trending"
  }
];
```

## 📱 Responsive Breakpoints

- **Desktop**: 1024px and above
- **Tablet**: 768px - 1024px
- **Mobile**: Below 768px

Each component is optimized for all screen sizes with:
- Collapsible sidebar
- Stacked layouts on mobile
- Adjusted typography sizes
- Touch-friendly button sizes

## 🎯 Component Details

### Hero Card
- Displays greeting message
- Shows user statistics (Reviews, Rating, Points)
- Features call-to-action button
- Animated background gradient

### Streak Card
- Weekly activity tracker with bar chart
- Current streak counter
- Motivational message
- Write review action button

### Rewards Card
- Shows next available reward
- Progress bar with animated gradient
- Point tracking
- Tips for earning more points

### Achievements Section
- Grid display of badges
- Locked/unlocked state
- Hover animations
- View all badges link

### Recommended Feed
- Responsive grid of food cards
- Food image, price, rating
- Tag badges (Trending, Healthy, etc.)
- Add to favorites button

### Review History
- List of user reviews
- Filter by Latest/Top Rated
- Food image preview
- Rating and review text
- Social actions (Like, Comment, Share)
- Load more functionality

## 🎭 Theme Variations

### Dark Mode (Default)
All components come with dark theme. Background colors use:
- `rgba(30, 30, 45, 0.85)` for cards
- Glassmorphism with backdrop blur

### Light Mode (Optional)
To implement light mode, create inverse color schemes:
```css
.light-theme {
  --bg-primary: #ffffff;
  --bg-secondary: #f5f5f5;
  --text-primary: #1a1a1a;
}
```

## 🚦 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

Note: CSS backdrop-filter is used for glassmorphism. For older browsers, fallback to solid colors.

## ⚡ Performance Tips

1. **Lazy Loading Images**:
```jsx
<img src={url} alt="food" loading="lazy" />
```

2. **Code Splitting**:
```jsx
const Dashboard = React.lazy(() => import('./Dashboard'));
```

3. **Optimize Animations**:
- Use `will-change` CSS property for animated elements
- Reduce animation duration on mobile
- Use GPU acceleration with `transform` and `opacity`

## 🔧 Accessibility

- Semantic HTML structure
- ARIA labels on icons
- Keyboard navigation support
- Focus states on interactive elements
- Color contrast ratios meeting WCAG AA standards

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Glassmorphism Design](https://glassmorphism.com)
- [CSS Gradient Generator](https://gradient.style)

## 🤝 Integration with Backend

### API Endpoints to Implement

1. **User Data**:
   ```
   GET /api/user/profile
   GET /api/user/achievements
   GET /api/user/rewards
   ```

2. **Food & Reviews**:
   ```
   GET /api/food/recommended
   GET /api/reviews/user
   GET /api/stalls/all
   ```

3. **Notifications**:
   ```
   GET /api/notifications
   POST /api/notifications/mark-read
   ```

### Example API Integration

```jsx
useEffect(() => {
  fetchUserData();
  fetchRecommendedFood();
  fetchReviews();
}, []);

const fetchUserData = async () => {
  try {
    const response = await fetch('/api/user/profile');
    const data = await response.json();
    setUserData(data);
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};
```

## 📝 Notes

- All images use placeholder URLs from Unsplash
- Replace with your own images for production
- Mock data included for demonstration purposes
- Customize colors, fonts, and layouts as needed
- Ensure all external APIs are properly configured

## 📄 License

This project is open source and available under the MIT License.

---

**Built with ❤️ for campus dining communities**
