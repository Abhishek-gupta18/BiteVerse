# BiteVerse — Campus Food Discovery + Community Platform

BiteVerse is a campus-focused food discovery application where students and faculty can browse colleges, discover stalls, leave reviews, and participate in a verified campus food ecosystem.

This project now includes a working Express + PostgreSQL backend and a Vite + React frontend with real auth, verification gating, food and review APIs, and live dashboard data wiring.

---

## ✅ What has been built

### Core backend
- PostgreSQL-based schema for colleges, users, stalls, food items, and reviews
- JWT-based authentication with cookie session handling
- `verification_status` flow for `pending`, `verified`, and `rejected` users
- Admin verification endpoints for pending user approval and rejection
- `requireVerified` middleware for protected content routes
- `food-items` and `reviews` endpoints protected with verified-only access
- Trending recommendations endpoint:
  - `GET /api/food-items/trending?college_id=<id>`
  - 90-day rating window
  - Bayesian confidence score
  - seasonal boost handling

### Frontend integration
- Login is wired to the backend auth APIs
- Register is wired to the backend and includes ID-card upload
- Pending-verification gating works via protected routes
- Dashboard pulls profile information from `AuthContext`
- Dashboard fetches live trending food recommendations by college
- Quick actions for review and stall creation are connected to working routes

### Admin flow
- Admin verification approval and rejection UI is implemented
- Admin-only guard is active for verification-related pages

---

## 🏗️ Current project status

### Completed
- React front-end structure and dashboard UI
- Real auth + session flow
- Verified-only content protection
- CRUD APIs for colleges, stalls, food items, reviews
- Admin verification flow
- Dashboard connected to live data
- Trending recommendations logic
- Build validation for frontend

### Still pending / next work
- End-to-end runtime validation against a live Postgres database with seeded test data
- Real Cloudinary credentials for production upload flow
- Full gamification/XP/leaderboard backend integration
- More advanced filtering and ranking polish
- Deployment setup and environment hardening

---

## 📅 Project timeline

| Date | Work completed |
|------|----------------|
| 2026-04 to 2026-05 | Initial dashboard UI, landing flow, auth screens, and global styling for BiteVerse |
| 2026-05 | Registration, login, college selection, and UI polish for campus onboarding |
| 2026-05 | Explore Food, search/filter UI, dashboard interactions, notifications, and route wiring |
| 2026-07 | Backend shift from mock/static flow to PostgreSQL + Express architecture |
| 2026-08 | Auth verification system, admin approval flow, and verified-only access model |
| 2026-08 | Stalls, food-items, reviews, and trending recommendation APIs implemented |
| 2026-08 | Frontend dashboard wired to real user/session data and live trending endpoint |
| 2026-08 | Quick action forms for review/stall creation added |

---

## 📝 Next steps

- Validate the complete flow with a live PostgreSQL instance and seeded records
- Test login/register/verification/admin approval end-to-end in browser
- Connect real Cloudinary credentials for ID-card upload in production
- Add gamification backend for XP, badges, and leaderboard logic
- Expand recommendation tuning and filters for better campus personalization
- Prepare production deployment configuration and environment checks

---

## 🧪 Verification status

The project has been checked with working build validation:

```bash
cd d:/open_sourse/biteverse/frontend && npm run build
```

This succeeded with Vite production build output.

Backend route files were also checked for syntax validity with Node:

```bash
cd d:/open_sourse/biteverse/backend-node && node --check src/routes/stalls.js
cd d:/open_sourse/biteverse/backend-node && node --check src/routes/food-items.js
```

These completed without syntax errors.

---

## 📚 Project docs

- [startup.md](startup.md)
- [AUTH_SETUP_GUIDE.md](AUTH_SETUP_GUIDE.md)
- [QUICK_START_AUTH.md](QUICK_START_AUTH.md)
- [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)

---

## 🔧 Stack

- Frontend: React + Vite
- Backend: Node.js + Express
- Database: PostgreSQL
- Auth: JWT + cookies + verification status
- Upload: Cloudinary + multer
- UI: dashboard-driven campus food platform
