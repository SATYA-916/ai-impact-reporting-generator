# Clean-Slate-AI

This application has been structured into two distinct Node.js projects: `frontend` and `backend`.

## Project Structure
- `frontend/`: The React + Vite SPA built dynamically without typescript.
- `backend/`: The Express + Native NodeJS REST API.

## How to Run

Because the applications are entirely decoupled, they must be run in separate terminal tabs/instances.

### 1. Starting the Backend API
The backend must run for the frontend to communicate with it. It serves requests on port 5000 by default. Look out for the setup configuration in `backend/.env`.

```bash
cd backend
npm install
npm run dev
```

### 2. Starting the Frontend UI
The UI is built with Vite. Running the dev server will proxy any `/api/*` calls over to the backend server operating on port 5000.

```bash
cd frontend
npm install
npm run dev
```

Access the frontend via your browser at the Local URL printed in the second console (typically `http://localhost:5173/`).
