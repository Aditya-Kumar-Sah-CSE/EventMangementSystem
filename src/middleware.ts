// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Global CORS middleware for the Next.js App Router.
 * Reads the allowed origin from the environment variable `ALLOWED_ORIGIN`.
 * If not set, defaults to "*" (allow all origins).
 * Handles preflight OPTIONS requests automatically.
 */
export function middleware(request: NextRequest) {
  const allowedOrigin = process.env.ALLOWED_ORIGIN || '*';
  const response = NextResponse.next();
  response.headers.set('Access-Control-Allow-Origin', allowedOrigin);
  response.headers.set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Short‑circuit preflight requests.
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: response.headers,
    });
  }

  return response;
}

export const config = {
  matcher: '/api/:path*', // Apply only to API routes.
};