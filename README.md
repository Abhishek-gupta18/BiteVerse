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

## Next Step
- Implement full auth flow in Node backend: user table, OTP storage, OTP verification, JWT issuance, and protected routes.
