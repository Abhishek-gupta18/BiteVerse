# 🎯 Dashboard Installation & Setup Guide

## Quick Start

### 1️⃣ File Structure Setup

Ensure all files are in the correct locations:

```
frontend/
├── src/
│   ├── Dashboard.jsx
│   ├── Dashboard.css
│   ├── globals.css
│   ├── App.jsx
│   ├── main.jsx
│   ├── components/
│   │   ├── Sidebar.jsx
│   │   ├── Navbar.jsx
│   │   └── sections/
│   │       ├── HeroCard.jsx
│   │       ├── StreakCard.jsx
│   │       ├── RewardsCard.jsx
│   │       ├── AchievementsSection.jsx
│   │       ├── RecommendedFeed.jsx
│   │       └── ReviewHistorySection.jsx
│   ├── styles/
│   │   ├── Sidebar.css
│   │   ├── Navbar.css
│   │   ├── HeroCard.css
│   │   ├── StreakCard.css
│   │   ├── RewardsCard.css
│   │   ├── AchievementsSection.css
│   │   ├── RecommendedFeed.css
│   │   └── ReviewHistorySection.css
│   ├── config/
│   │   └── dashboardConfig.js
│   └── DASHBOARD_README.md
├── package.json
└── vite.config.js
```

### 2️⃣ Update HTML

Make sure your `index.html` includes:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- Import Google Fonts (Optional but recommended) -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link 
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Poppins:wght@400;500;600;700;800&display=swap" 
      rel="stylesheet"
    />
    
    <title>Campus Eats - Dashboard</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

### 3️⃣ Update main.jsx

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './globals.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

### 4️⃣ Update App.jsx

```jsx
import React from 'react'
import Dashboard from './Dashboard'
import './Dashboard.css'

function App() {
  return (
    <div className="app-wrapper">
      <Dashboard userRole="student" />
    </div>
  )
}

export default App
```

### 5️⃣ Install Dependencies

```bash
cd frontend
npm install
```

**Optional: Install for Google Fonts locally**
```bash
npm install @fontsource/inter @fontsource/poppins
```

Then import in `main.jsx`:
```jsx
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@fontsource/inter/800.css'
```

### 6️⃣ Start Development Server

```bash
npm run dev
```

The dashboard should now be running at `http://localhost:5173`

---

## 🎨 Customization Quick Guide

### Change Color Scheme

Edit `globals.css` and modify the gradient:

```css
body {
  background: linear-gradient(
    135deg, 
    #YOUR_COLOR1 0%, 
    #YOUR_COLOR2 25%, 
    #YOUR_COLOR3 50%, 
    #YOUR_COLOR4 75%, 
    #YOUR_COLOR5 100%
  );
}
```

Or use the config file approach:

```jsx
import { THEME } from './config/dashboardConfig'

// Access colors
const primaryColor = THEME.colors.primary.purple // "#667eea"
```

### Change Fonts

Edit `globals.css`:

```css
body {
  font-family: "YourFont", "Fallback", sans-serif;
}
```

### Modify Component Layout

Edit components directly in `components/` and `components/sections/`

Example - Change HeroCard greeting:
```jsx
// In HeroCard.jsx
const getGreeting = () => {
  return "Welcome Back! 👋"; // Change this
};
```

---

## 🔗 API Integration Checklist

- [ ] Connect user profile API
- [ ] Connect food recommendations API
- [ ] Connect reviews API
- [ ] Connect achievements API
- [ ] Connect notifications API
- [ ] Update `config/dashboardConfig.js` with real endpoints
- [ ] Replace mock data with real data
- [ ] Test all API calls
- [ ] Implement error handling

### Example API Integration:

```jsx
// In Dashboard.jsx
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch('/api/user/profile')
      const userData = await response.json()
      setUserData(userData)
    } catch (error) {
      console.error('Error:', error)
    }
  }
  
  fetchData()
}, [])
```

---

## 📱 Testing Responsive Design

### Using Chrome DevTools:

1. Open Developer Tools: `F12` or `Ctrl+Shift+I`
2. Click device toolbar: `Ctrl+Shift+M`
3. Test different screen sizes:
   - Mobile: 375px × 667px
   - Tablet: 768px × 1024px
   - Desktop: 1920px × 1080px

### Manual Testing Devices:

- ✅ iPhone 12/13/14 (390px)
- ✅ iPad (768px)
- ✅ iPad Pro (1024px)
- ✅ Desktop (1440px+)

---

## 🐛 Troubleshooting

### Issue: Styles not applying

**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules
npm install
npm run dev
```

### Issue: Images not loading

**Solution:**
- Check image URLs are valid
- Verify CORS headers on image server
- Use placeholder from Unsplash: `https://images.unsplash.com/photo-[ID]`

### Issue: Animations lag on mobile

**Solution:**
- Reduce animation duration in CSS
- Use `will-change` property carefully
- Profile with DevTools Performance tab

### Issue: Backdrop filter not working

**Solution:**
- Use fallback background color:
```css
.glass-effect {
  background: rgba(30, 30, 45, 0.9);
  backdrop-filter: blur(10px);
}
```

### Issue: Font not loading

**Solution:**
- Check Google Fonts CDN link
- Verify font family name in CSS
- Clear browser cache

---

## 🚀 Production Deployment

### Before Deploying:

1. **Run Build**:
```bash
npm run build
```

2. **Test Build Locally**:
```bash
npm run preview
```

3. **Optimize Images**:
- Compress all images
- Use modern formats (WebP)
- Add loading="lazy" to images

4. **Check Performance**:
- Lighthouse score: Aim for 90+
- Bundle size: Minimize CSS/JS
- Load time: < 3 seconds

5. **Security**:
- Update dependencies: `npm audit fix`
- Use HTTPS only
- Set proper CSP headers

### Deploy to Vercel (Recommended):

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Netlify:

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

---

## 📋 Accessibility Checklist

- [ ] Keyboard navigation works
- [ ] Color contrast ratio > 4.5:1
- [ ] All images have alt text
- [ ] Semantic HTML used
- [ ] ARIA labels present
- [ ] Focus states visible
- [ ] Mobile touch targets 44px+

---

## 🔍 Performance Optimization

### CSS Optimization:

```bash
# Install cssnano for production
npm install --save-dev cssnano
```

### Code Splitting:

```jsx
// Instead of:
import Dashboard from './Dashboard'

// Use:
const Dashboard = React.lazy(() => import('./Dashboard'))
```

### Image Optimization:

```jsx
// Use next-gen formats with fallback
<picture>
  <source srcSet="image.webp" type="image/webp" />
  <img src="image.jpg" alt="description" loading="lazy" />
</picture>
```

---

## 📚 Additional Resources

- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)
- [CSS-Tricks](https://css-tricks.com)
- [Web.dev Performance](https://web.dev/performance)

---

## ✅ Final Checklist

- [ ] All files in correct folders
- [ ] globals.css imported first
- [ ] Dashboard component rendering
- [ ] Responsive design working
- [ ] API endpoints configured
- [ ] Mock data prepared
- [ ] Colors customized
- [ ] Fonts loaded
- [ ] Images optimized
- [ ] Build tested locally
- [ ] Accessibility verified
- [ ] Performance optimized
- [ ] Ready for deployment

---

**Need help?** Check `DASHBOARD_README.md` for more detailed documentation!
