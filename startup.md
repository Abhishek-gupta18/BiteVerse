# Startup Guide — Run the app (Frontend + Backend)

This file contains the exact commands to install dependencies and start both the backend and frontend development servers on your machine.

Notes:
- This project uses a Node backend (`backend-node`) and a Vite React frontend (`frontend`).
- On Windows PowerShell use `npm.cmd` if `npm` scripts trigger execution-policy warnings.
- Backend expects a `.env` file — copy from the example and fill in DB credentials before starting.

## Check Node / npm

Run (PowerShell / bash):

```bash
node -v
npm -v
```

## Backend — install & start (PowerShell)

Open a terminal, then:

```powershell
cd \"d:\Autocad\backend-node\"
# Create .env from example (Windows)
copy .env.example .env
# Install dependencies
npm.cmd install
# Run dev server (nodemon)
npm.cmd run dev
```

Or (bash / WSL / Mac / Linux):

```bash
cd /path/to/Autocad/backend-node
cp .env.example .env
npm install
npm run dev
```

Default backend URL (dev): http://localhost:5000/ (health: /api/health)

## Frontend — install & start (PowerShell)

Open a second terminal, then:

```powershell
cd \"d:\Autocad\frontend\"
# Install dependencies
npm.cmd install
# Start Vite dev server
npm.cmd run dev
```

Or (bash / WSL / Mac / Linux):

```bash
cd /path/to/Autocad/frontend
npm install
npm run dev
```

Default frontend URL (Vite dev): http://localhost:5173/

## Running both servers at once (suggested)

- Start backend in one terminal and leave it running.
- Start frontend in a second terminal.
- The UI will communicate with the backend at the configured port (5000).

## Troubleshooting

- If PowerShell blocks script execution for `npm` hooks, use `npm.cmd` (Windows) as shown above.
- If the backend reports database connection errors, open `backend-node\.env` and update MySQL credentials.
- If ports 5173 or 5000 are in use, Vite or the backend will show the conflict — stop the other process or change ports.

## Useful commands

Stop a server: press `Ctrl+C` in the terminal where it is running.

Build for production (frontend):

```bash
# from frontend folder
npm run build
npm run preview
```

Start in production mode (backend):

```bash
# from backend-node folder
npm.cmd run start   # uses node src/index.js
```

---

If you'd like, I can also create a single PowerShell script that launches both servers in separate terminals automatically. Would you like me to add that?