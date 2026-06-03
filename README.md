# EventMangementSystem

## Overview
A **premium, Antigraviti‑styled** event‑management dashboard built with **Next.js 15 (App Router)**, **Tailwind CSS**, **Lucide React icons**, and **Recharts**. The UI features glass‑morphic cards, dark mode, micro‑animations, and a responsive layout.

The backend is powered by **Prisma ORM** with a **MySQL** database and a **simple JWT‑based authentication** flow (register, login, protected routes).

![Dashboard screenshot](./screenshots/dashboard.png)

## Features
- **Antigraviti design** – dark glassmorphic UI, neon accents, interactive cards.
- **Metric cards** showing tickets booked, upcoming events, revenue, etc.
- **Live area chart** (Recharts) for ticket sales.
- **Search palette** with filter tags.
- **Quick‑action hub** for browsing, creating events, and viewing tickets.
- **Activity sidebar** with upcoming dates and live alerts.
- **RESTful API** (`/api/auth`, `/api/events`, `/api/tickets`).
- **JWT auth** – stateless token stored in client side (e.g., `localStorage`).
- **Prisma models** – `User`, `Event`, `Ticket`.
- **MySQL** support – easily switch to any MySQL provider.
- **Deployable to Vercel** (or any Node.js host) with environment variables.

## Getting Started (Local Development)
1. **Clone the repo** (once it’s pushed) and `cd` into the project.
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Set up environment variables** – copy the example file:
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` and provide:
   - `DATABASE_URL` – MySQL connection string (e.g., `mysql://user:pass@localhost:3306/eventdb`).
   - `JWT_SECRET` – a strong random string.
4. **Run Prisma migrations**:
   ```bash
   npx prisma migrate dev --name init
   ```
5. **Start the dev server**:
   ```bash
   npm run dev   # http://localhost:3000
   ```

### Production Build
```bash
npm run build && npm start
```

## Deployment (Vercel)
1. **Create a new Vercel project** linked to this GitHub repo.
2. **Add the same environment variables** (`DATABASE_URL`, `JWT_SECRET`) in the Vercel dashboard.
3. Vercel will automatically run `npm install`, `npx prisma generate`, and `npm run build`.
4. After the build finishes, Vercel provides a live URL (e.g., `https://event-management-system.vercel.app`).

## API Endpoints
| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/auth/register` | Register a new user (email, password). |
| `POST` | `/api/auth/login` | Login, returns JWT token. |
| `GET`  | `/api/events` | List all events (public). |
| `POST` | `/api/events` | Create event – requires JWT. |
| `PUT`  | `/api/events/:id` | Update event – requires JWT. |
| `DELETE`| `/api/events/:id` | Delete event – requires JWT. |
| `GET`  | `/api/tickets` | List tickets for the authenticated user. |
| `POST` | `/api/tickets` | Purchase tickets – requires JWT. |

## License
MIT – feel free to fork, modify, and deploy.