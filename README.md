# EduHub — Full-Stack Learning & Chat Platform

> A modern, glassmorphic full-stack application for student collaboration, messaging, and community learning. Built with React (Vite), Node.js Express backend, MySQL database, and a refined **Fluid Expression** design system.

---

## 🎯 Features

- **💬 Real-time Chat Hub** — Three-column glassmorphism interface with message threading, participant status, and quick actions
- **📝 Smart Registration** — College dropdown (117 NIRF-verified institutions), manual input toggle, cartoon avatar generation & customization
- **🎨 Fluid Expression Design System** — Plus Jakarta Sans typography, orange/purple color palette, pill-shaped components, glassmorphic surfaces
- **🔐 Authentication** — JWT + OTP integration (in development)
- **📱 Responsive Design** — Mobile-first, adapts seamlessly from 640px to ultra-wide displays
- **🚀 Development Ready** — Hot-reload frontend (Vite), auto-restarting backend (nodemon), organized project structure

---

## 📸 Screenshots

### Chat Hub Interface — Glassmorphic Three-Column Layout
![Chat Hub](Screenshot%202026-05-05%20145239.png)

### Registration Page — College Dropdown & Avatar Customization
![Registration](Screenshot%202026-05-05%20145323.png)

### Dashboard Integration — Sidebar & Navigation
![Dashboard](Screenshot%202026-05-05%20145358.png)

### Mobile Responsive View
![Mobile View](Screenshot%202026-05-05%20145413.png)

---

## 🏗️ Architecture

```
d:\Autocad/
├── frontend/                    # React + Vite (port 5173)
│   ├── src/
│   │   ├── components/sections/ # Page components (Chat, Register, Login)
│   │   ├── styles/              # Component & global styling (chat.css, Register.css, globals.css)
│   │   ├── collegeOptions.js    # 117 college lookup table (NIRF + medical)
│   │   ├── App.jsx              # Landing page with hero CTA & navbar
│   │   ├── Login.jsx            # Login form
│   │   ├── Register.jsx         # Registration with college dropdown
│   │   ├── index.css            # Base styles
│   │   └── main.jsx             # Entry point
│   └── vite.config.js
│
├── backend-node/                # Node.js Express (port 5000)
│   ├── src/
│   │   ├── index.js             # Server entry point
│   │   └── config/
│   │       └── db.js            # MySQL connection pool
│   ├── .env.example             # Environment template
│   └── package.json
│
├── startup.md                   # Quick start guide (Windows/Mac/Linux)
└── README.md                    # This file

```

---

## 🎨 Design System — Fluid Expression

**Typography:** Plus Jakarta Sans (headline, body, label scales)
**Primary Colors:** Orange (#ff6b00, #ff7a1a) + Purple (#6b3dca, #8458e4)
**Surfaces:** Bright white to soft greys with translucent overlays (80% opacity)
**Effects:** Glassmorphism (semi-transparent + 16–24px blur), soft ambient shadows
**Shapes:** Pill-rounded (999px radius), 24px corners on containers, asymmetrical message bubbles
**Elevation:** Soft inset shadows, floating avatar status rings, pulsing animations

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** v16+ and npm v8+
- **MySQL** server running locally (or remote connection)
- **PowerShell** or Bash terminal

### Setup & Run (Windows PowerShell)

**One-liner or step-by-step — see [startup.md](startup.md) for detailed instructions:**

```powershell
# Backend: Terminal 1
cd d:\Autocad\backend-node
copy .env.example .env          # Fill in MySQL credentials
npm.cmd install
npm.cmd run dev                 # Runs on http://localhost:5000

# Frontend: Terminal 2
cd d:\Autocad\frontend
npm.cmd install
npm.cmd run dev                 # Runs on http://localhost:5173
```

### Setup & Run (Mac / Linux / WSL / Bash)

```bash
# Backend: Terminal 1
cd /path/to/Autocad/backend-node
cp .env.example .env            # Fill in MySQL credentials
npm install
npm run dev                     # Runs on http://localhost:5000

# Frontend: Terminal 2
cd /path/to/Autocad/frontend
npm install
npm run dev                     # Runs on http://localhost:5173
```

See **[startup.md](startup.md)** for troubleshooting, production builds, and full details.

---

## 🛠️ Tech Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Frontend** | React | 18.x | UI components & state management |
| **Build** | Vite | 8.x | Lightning-fast dev server & bundling |
| **Typography** | Plus Jakarta Sans | — | Fluid Expression primary font |
| **Backend** | Node.js + Express | 20.x / 4.x | REST API & business logic |
| **Database** | MySQL | 8.x | Persistent data storage |
| **Auth** | JWT + OTP | — | Secure login & verification (in dev) |
| **Data** | Fetch API | — | Frontend ↔ Backend communication |
| **Icons** | Material Symbols | — | Semantic icon system (reference) |

---

## 📋 Final Stack Summary

- **Frontend:** React (Vite)
- **Backend:** Node.js (Express)
- **Database:** MySQL
- **Auth Modules:** JWT + OTP dependencies installed

---

## ⚙️ API & Health Checks

### Backend Health Check
```bash
curl http://localhost:5000/api/health
# Expected response: { "status": "ok", "database": "connected" }
```

### MySQL Configuration
1. Create a MySQL database locally or connect to a remote instance.
2. Fill credentials in `backend-node/.env` (copy from `.env.example`):
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=education_db
   ```
3. Verify backend health endpoint returns `"database": "connected"`.

---

## 📚 Frontend Development

### Available Scripts

**Development Server (Hot Reload):**
```bash
npm run dev         # Vite dev server at http://localhost:5173
```

**Production Build:**
```bash
npm run build       # Optimized bundle in dist/
npm run preview     # Preview production build locally
```

**Linting (ESLint):**
```bash
npm run lint        # Check code style
```

---

## 🗄️ Backend Development

### Available Scripts

**Development Server (Auto-Restart):**
```bash
npm run dev         # Nodemon watches & restarts on file changes
```

**Production Mode:**
```bash
npm run start       # Node.js production server
```

---

## 📅 Project Timeline

| Date | Day | Work Done | Files |
|------|-----|-----------|-------|
| 2026-04-21 | Day 1 | Rebuilt dashboard layout and replaced old mixed cards with preference/reward/achievement/chat panels | `frontend/src/Dashboard.jsx`, `frontend/src/Dashboard.css` |
| 2026-04-21 | Day 1 | Updated top search and left navigation to match the new dashboard wireframe | `frontend/src/components/Navbar.jsx`, `frontend/src/components/Sidebar.jsx`, `frontend/src/styles/Navbar.css`, `frontend/src/styles/Sidebar.css` |
| 2026-04-22 | Day 2 | Fixed grid overlap between food preference and achievements panels | `frontend/src/Dashboard.css` |
| 2026-05-03 | Day 12 | Wired chat navigation to `/chat` and refined sidebar behavior and transitions | `frontend/src/components/Navbar.jsx`, `frontend/src/components/Sidebar.jsx`, `frontend/src/styles/Sidebar.css` |
| 2026-05-04 | Day 13 | Updated registration flow with college dropdown and avatar customization polish | `frontend/src/Register.jsx`, `frontend/src/Login.jsx`, `frontend/src/collegeOptions.js` |
| 2026-05-05 | Day 14 | Implemented glassmorphic chat hub and finalized Fluid Expression base styling | `frontend/src/components/sections/chat.jsx`, `frontend/src/styles/chat.css`, `frontend/src/globals.css` |
| 2026-05-07 | Day 16 | Added Explore Food route and wired navigation from dashboard, sidebar, and chat | `frontend/src/main.jsx`, `frontend/src/Dashboard.jsx`, `frontend/src/components/Sidebar.jsx`, `frontend/src/components/sections/chat.jsx` |
| 2026-05-07 | Day 16 | Implemented Explore Food functional filters and search with dynamic result states and shared footer integration | `frontend/src/Exp-Food.jsx`, `frontend/src/styles/Exp-Food.css` |
| 2026-05-08 | Day 17 | Added sliding transitions to Explore Food sections and filter interactions (horizontal reveal + active slider) | `frontend/src/Exp-Food.jsx`, `frontend/src/styles/Exp-Food.css` |
| 2026-05-08 | Day 17 | Added notifications dropdown in dashboard header with unread indicator, outside-click close, and mark-all-read action | `frontend/src/Dashboard.jsx`, `frontend/src/Dashboard.css` |

---

## 🔧 Troubleshooting

| Issue | Solution |
|-------|----------|
| **PowerShell blocks `npm`** | Use `npm.cmd` on Windows (see [startup.md](startup.md)) |
| **Database connection error** | Update `.env` with correct MySQL credentials |
| **Port 5173 or 5000 in use** | Kill existing process or change port in config |
| **Vite module not found** | Run `npm install` in `frontend/` and restart dev server |
| **Chat images not loading** | Verify image files exist in root directory |

---

## 📝 Next Steps

- ✅ Frontend UI complete (Chat, Register, Landing)
- ✅ Design system applied (Fluid Expression, glassmorphism, typography)
- ⏳ Backend API integration (register endpoint, message persistence)
- ⏳ Database schema & migrations
- ⏳ Complete auth flow (OTP, JWT verification)
- ⏳ Production deployment (Docker, hosting)

---

## 📖 Learn More

- **[Startup Guide](startup.md)** — Detailed setup instructions for all platforms
- **[React Vite Docs](https://vitejs.dev/)** — Build tool documentation
- **[Express.js Docs](https://expressjs.com/)** — Backend framework
- **Plus Jakarta Sans** — [Google Fonts](https://fonts.google.com/specimen/Plus+Jakarta+Sans)
