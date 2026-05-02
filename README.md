# Full-Stack Project Setup

## Final Stack
- Frontend: React (Vite)
- Backend: Node.js (Express)
- Database: MySQL
- Auth modules: JWT + OTP dependencies installed

## Project Structure
- frontend
- backend-node

## Frontend (React)
Run:
```bash
npm run dev --prefix frontend
```

Build:
```bash
npm run build --prefix frontend
```

## Backend (Node)
Create env file:
```bash
copy backend-node\.env.example backend-node\.env
```

Run dev server:
```bash
npm run dev --prefix backend-node
```

Run production mode:
```bash
npm run start --prefix backend-node
```

Health check:
- http://localhost:5000/api/health

## MySQL
1. Create a MySQL database.
2. Fill credentials in `backend-node/.env`.
3. Verify backend health endpoint returns `database: connected`.

## Project Timeline

| Date | Day No. | Work Done | Files |
| --- | --- | --- | --- |
| 2026-04-21 | Day 1 | Rebuilt the user dashboard around the new wireframe, replacing the old mixed card layout with dedicated food preference, reward, achievements, and minimized chat panels. | `frontend/src/Dashboard.jsx`, `frontend/src/Dashboard.css` |
| 2026-04-21 | Day 1 | Updated the top search bar and the left rail so the dashboard header and navigation match the new layout. | `frontend/src/components/Navbar.jsx`, `frontend/src/components/Sidebar.jsx`, `frontend/src/styles/Navbar.css`, `frontend/src/styles/Sidebar.css` |
| 2026-04-22 | Day 2 | Fixed the overlap between the food preference panel and the achievements panel by separating their grid placement. | `frontend/src/Dashboard.css` |
| 2026-05-03 | Day 12 | Wired the chat button in the Navbar and "Messages" in the Sidebar to redirect to the chat section (`/chat`). | `frontend/src/components/Navbar.jsx`, `frontend/src/components/Sidebar.jsx` |
| 2026-05-03 | Day 12 | Redesigned and animated the sidebar with smooth expand/collapse transitions, improved spacing, larger closed state (90px), and cleaned up abnormal styling. | `frontend/src/styles/Sidebar.css` |

> The timeline below should be updated as new project work lands.

## Next Step
- Implement full auth flow in Node backend: user table, OTP storage, OTP verification, JWT issuance, and protected routes.
