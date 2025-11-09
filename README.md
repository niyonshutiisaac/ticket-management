# Rwanda Connect Ride

Full-stack transportation booking system with TypeScript, React, and Express.

## Quick Start

Make sure you have Node.js installed (v14+ recommended).

1. Install dependencies:
```bash
npm run install:all
```

2. Start development servers:
```bash
npm run dev
```

This will start:
- Frontend: http://localhost:5173 (Vite dev server)
- Backend: http://localhost:3000 (Express API)

## Development

### Frontend (Vite + React + TypeScript)
- Source: `frontend/`
- Dev server: `npm run dev:frontend`
- Build: `npm run build:frontend`

### Backend (Express + TypeScript)
- Source: `backend/`
- Dev server: `npm run dev:backend`
- Build: `npm run build:backend`

## API Documentation

The backend exposes these main endpoints (all under `/api`):

### Auth
- POST /api/auth/register - Register new user
- POST /api/auth/login - Login user
- POST /api/auth/logout - Logout user
- GET /api/auth/profile - Get current user profile

### Routes
- GET /api/routes/search - Search routes
- GET /api/routes/:id - Get route details
- GET /api/routes/popular - List popular routes

### Trips
- GET /api/trips/:id - Get trip details
- GET /api/trips/:id/seats - List available seats
- POST /api/trips/:id/hold-seat - Hold a seat

### Bookings
- POST /api/bookings - Create booking
- GET /api/bookings - List user's bookings
- GET /api/bookings/:id - Get booking details
- POST /api/bookings/:id/cancel - Cancel booking
- GET /api/bookings/:id/qr - Get booking QR code

See `backend/src/api/` for full API implementation.

## Environment Variables

Frontend (`.env` in frontend/):
```
VITE_API_BASE_URL=/api
```

Backend (`.env` in backend/):
```
PORT=3000
NODE_ENV=development
```

## Scripts

From repository root:

- `npm run dev` - Start both frontend and backend in development mode
- `npm run build` - Build both frontend and backend
- `npm run start` - Start both in production mode
- `npm run install:all` - Install all dependencies

## License

MIT