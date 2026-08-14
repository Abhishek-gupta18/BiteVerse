# BiteVerse — Campus Food Discovery + Community Platform

BiteVerse is a campus-focused food discovery and community platform built for students to discover local food options, review stalls, find popular dishes, and browse verified campus-based listings.

This project combines a React + Vite frontend with an Express + PostgreSQL backend and includes real authentication, verification gating, admin approval, recommendation logic, and dashboard integration.

---

## Overview

The application allows users to:

- browse colleges and campus food options
- create and manage stalls
- add food items and reviews
- access protected content only after verification
- view personalized recommendations and dashboard activity
- allow admins to review and approve user verification requests

The product is designed around a verified campus ecosystem so that only approved users can interact with stalls, food, reviews, and other protected community content.

---

## Current implementation status

### Completed

- PostgreSQL schema and backend setup
- JWT cookie-based authentication
- user verification flow with `pending`, `verified`, and `rejected` states
- admin verification queue and approval/rejection endpoints
- `authenticateToken` and `requireVerified` middleware protection
- colleges CRUD and public browse flow
- stalls CRUD with verified-only access
- food-items CRUD and trending recommendations API
- reviews API with verified-only protections
- dashboard connected to real backend data
- frontend login/register wiring to actual APIs
- pending verification UI and route gating
- admin verification UI wiring
- frontend production build validation

### Still pending

- full end-to-end validation with live PostgreSQL data
- live Cloudinary credentials and production upload testing
- XP, badges, and leaderboard backend integration
- advanced personalization and ranking refinements
- deployment setup and environment hardening

---

## Tech stack

| Layer | Technology | Purpose |
|------|------------|---------|
| Frontend | React + Vite | User interface and app shell |
| Backend | Node.js + Express | REST APIs and server logic |
| Database | PostgreSQL | Persistent application data |
| Auth | JWT cookies + middleware | Session handling and protected access |
| Uploads | Cloudinary + multer | ID-card upload support |
| Styling | custom CSS + React components | Dashboard and app UI |

---

## Project structure

```text
d:\open_sourse\biteverse
├── backend-node/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   ├── colleges.js
│   │   │   ├── stalls.js
│   │   │   ├── food-items.js
│   │   │   ├── reviews.js
│   │   │   └── admin.js
│   │   ├── index.js
│   │   └── middleware/
│   ├── schema.sql
│   ├── package.json
│   └── setup-db.js
├── frontend/
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
├── AUTH_SETUP_GUIDE.md
├── IMPLEMENTATION_SUMMARY.md
├── QUICK_START_AUTH.md
├── startup.md
├── README.md
└── LICENSE
```

---

## Key features

### 1. Authentication and verification

The auth system supports:

- user registration
- login/logout flow
- JWT-based session handling
- ID-card upload during registration
- `verification_status` enforcement for protected routes

Roles and access levels include:

- regular users
- verified users
- admins

Protected routes are gated using middleware such as:

- `authenticateToken`
- `authorizeRole`
- `requireVerified`

### 2. College discovery

College routes support listing and browsing without exposing sensitive protected community flows.

This supports the onboarding flow and allows users to:

- browse colleges
- select their campus
- continue into verified app activities after authentication

### 3. Stall management

Stall routes support CRUD operations and are protected behind verification so only approved users can create or modify stall listings.

### 4. Food items and reviews

Users can create food items and reviews tied to stalls or campus discovery data. These APIs are protected to prevent anonymous or unverified posting.

### 5. Trending recommendations

The recommendation engine is built around a trending endpoint that evaluates:

- recent review activity
- average rating
- confidence score
- review recency window
- seasonal boost

This makes the recommendations more reflective of current campus preferences rather than stale historical data alone.

### 6. Admin verification queue

Admins can review pending ID-card uploads and approve or reject user verification requests. This keeps the app aligned with campus trust and accountability requirements.

---

## Backend architecture

The backend is organized around modular Express routes.

### Auth routes

The auth module handles:

- login
- registration
- logout
- session fetch via `/api/auth/me`
- verification status checks
- admin permission checks

### Colleges routes

The colleges module exposes browse and management APIs with public access for discovery and protected admin actions where needed.

### Stalls routes

Stall endpoints cover:

- list stalls
- create stall
- fetch stall by ID
- update stall
- delete stall
- admin-approved verification workflow

### Food items routes

Food item routes support listing and management with verified-only protection.

### Reviews routes

Reviews are part of the community layer and are protected to prevent anonymous or unverified posting.

### Admin routes

Admin APIs cover:

- pending verifications list
- approve a user
- reject a user

---

## Route protection model

The application follows a deliberately strict access pattern:

- public routes: college discovery only
- authenticated routes: account and session-sensitive actions
- verified routes: all social/community content creation and read access for protected flows
- admin routes: verification queue and authority actions

This ensures that users cannot access platform content unless they are authenticated and verified, while still keeping discovery and selection flows available for onboarding.

---

## Frontend architecture

The frontend uses a modern React build with route-based app flow.

### Main flows implemented

- landing experience
- login
- registration with ID-card upload
- pending verification screen
- protected dashboard
- admin verification UI
- review creation screen
- stall creation screen

### State handling

The frontend uses the auth context to maintain session state and user verification status. This drives route gating and UI decisions such as redirecting to verification screens for unapproved users.

---

## Setup and run

### Prerequisites

- Node.js 18+
- npm
- PostgreSQL database
- optional Cloudinary credentials for upload testing

### Backend setup

```bash
cd backend-node
npm install
```

Create or update your environment variables with database and auth secrets.

Then initialize the database schema:

```bash
node setup-db.js
```

Start the backend:

```bash
npm run dev
```

### Frontend setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will start on the Vite dev server and connect to the backend APIs.

---

## Environment configuration

The backend expects values for:

- database host/user/password/name
- JWT secret
- Cloudinary keys
- app base URL if needed

These should be configured in a local environment file before running the project.

---

## Verification commands used

The project has already been checked with the following commands:

```bash
cd d:/open_sourse/biteverse/frontend && npm run build
```

and

```bash
cd d:/open_sourse/biteverse/backend-node && node --check src/routes/stalls.js
cd d:/open_sourse/biteverse/backend-node && node --check src/routes/food-items.js
```

These completed successfully without syntax issues, and the frontend build completed successfully.

---

## Project timeline

| Date | Work completed |
|------|----------------|
| 2026-04 | Initial dashboard UI, landing flow, and design refinement |
| 2026-05 | Auth forms, registration flow, college selection, and onboarding polish |
| 2026-05 | Explore Food UI, filters, navigation interactions, and dashboard refinements |
| 2026-07 | Shift from static/mock app toward real backend architecture |
| 2026-08 | PostgreSQL backend implementation, verification system, and admin flows |
| 2026-08 | Stalls, food-items, reviews, and recommendation APIs added |
| 2026-08 | Dashboard integration with real auth and trending data |
| 2026-08 | Review/stall quick-action forms and verification route gating completed |

---

## Next steps

- validate the end-to-end flow with live PostgreSQL data and real seeded records
- test registration, login, verification approval, and admin review in browser
- configure production Cloudinary uploads for ID-card verification
- implement full XP, badge, and leaderboard logic
- expand recommendation tuning and filter personalization
- prepare production deployment and environment security configuration

---

## Documentation links

- [startup.md](startup.md)
- [AUTH_SETUP_GUIDE.md](AUTH_SETUP_GUIDE.md)
- [QUICK_START_AUTH.md](QUICK_START_AUTH.md)
- [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)

---

## Notes

This README reflects the engineering work that has already been completed and also highlights the remaining roadmap items. The project is currently in a stable implementation stage with validated frontend build output and backend syntax checks.
