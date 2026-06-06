# EventMangementSystem

## Overview
A **premium, Antigraviti‑styled** event‑management dashboard built with **Next.js 15 (App Router)**, **Tailwind CSS**, **Lucide React icons**, and **Recharts**.

The current backend implementation uses:
- **NextAuth (Credentials provider)** for authentication with a **JWT session strategy**.
- **MongoDB (Mongoose)** as the primary persistence layer (when enabled).
- A **mock/in‑memory user store** for signup in development (signup route has a `USE_MOCK_DB = true` switch).

![Dashboard screenshot](./screenshots/dashboard.png)

## Features
- **Antigraviti design** – dark glassmorphic UI, neon accents, interactive cards.
- **Metric cards** showing tickets booked, upcoming events, revenue, etc.
- **Live area chart** (Recharts) for ticket sales.
- **Search palette** with filter tags.
- **Quick‑action hub** for browsing, creating events, and viewing tickets.
- **Activity sidebar** with upcoming dates and live alerts.
- **Next.js API routes** under `src/app/api/*`.
- **Authentication** via **NextAuth Credentials + JWT strategy**.
- **MongoDB collections/models** (e.g., `User`, `Event`, `Ticket`) when Mongo is enabled.

> Note: Some API routes (e.g., events) may currently be skeletons/stubs depending on environment/config.

## Getting Started (Local Development)
1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   - Create `.env.local` based on your existing environment/example (if present).
Required:
     - `MONGODB_URI` – connection string for MongoDB (used by `src/lib/mongodb.ts`). (Only needed if you set signup to `USE_MOCK_DB = false`.)
     - `NEXTAUTH_SECRET` – **required** by NextAuth for stable auth/session handling (`src/app/auth.ts`).


3. **Start the dev server**:
   ```bash
   npm run dev   # http://localhost:3000
   ```

### Production Build
```bash
npm run build && npm start
```

## Deployment (Vercel)
1. Create a new Vercel project linked to this GitHub repo.
2. Add required environment variables in Vercel:
   - `MONGODB_URI`
   - `NEXTAUTH_SECRET`
3. Vercel will run `npm install` and build with `npm run build`.

## Auth & Users (Important)
- Auth uses **NextAuth Credentials**.
- Signup route currently defaults to **mock/in‑memory storage**:
  - `src/app/api/auth/signup/route.ts` sets `const USE_MOCK_DB = true`.
- To make signup use MongoDB, flip `USE_MOCK_DB` to `false` in that route.

## API Endpoints (Current Routes)
These routes live under the Next.js App Router and are implemented in `src/app/api/*`.

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/auth/signup` | Register a new user (email/password). (Mock-backed by default). |

| (Auth via NextAuth) | `/api/auth/*` | NextAuth endpoints (login/session). |

| `GET` | `/api/events` | Returns current events payload (may be stubbed depending on implementation). |
| `POST` | `/api/events` | Create event (requires NextAuth session; persistence may be incomplete depending on route implementation). |

> The previous README claimed CRUD endpoints for events/tickets, but the current codebase shows at least `src/app/api/events/route.ts` returning an initial/stub response.


## License
MIT – feel free to fork, modify, and deploy.
