# Project Documentation - Event Management System

## Overview
A modern event management platform built with Next.js 15, React, and MongoDB (via Mongoose).

## Project Structure

```text
/src
  /app            - Next.js App Router pages and API routes
    /api          - Backend API endpoints
    /dashboard    - Dashboard page
    /events       - Event browsing and creation
    /login        - Authentication
    /signup       - Registration
  /components     - Reusable UI components
    /auth         - Login and Register forms
    /dashboard    - Dashboard-specific components
    /events       - Event cards and forms
    /ui           - Core primitive components (Button, Input, etc.)
  /lib            - Utility functions and shared logic
    auth.ts       - NextAuth configuration
    mongodb.ts    - Database connection
    validations.ts - Zod validation schemas
  /models         - Mongoose database models (User, Event, Registration)
  /types          - Custom TypeScript type definitions
```

## Key Technologies
- **Next.js 15**: Core framework with App Router
- **Mongoose**: MongoDB object modeling
- **Next-Auth**: Authentication with credentials
- **Zod**: Schema-based validation
- **Tailwind CSS**: Styling
- **Lucide React**: Icons

## Cleanup and Fixes
- Removed over 20 redundant and empty files from the root and `src/app`.
- Consolidated all components into a organized `src/components` directory.
- Standardized database connection and authentication logic in `src/lib`.
- Fixed numerous broken imports across the project after restructuring.
- Resolved placement of Form components (moved from `api` routes to `components`).

## How to Run
1. Install dependencies: `npm install`
2. Configure environment variables in `.env.local` (see `.env.example`).
3. Run development server: `npm run dev`
