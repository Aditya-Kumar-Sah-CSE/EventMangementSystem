// src/lib/auth.ts
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
import prisma from './prisma';
import bcrypt from 'bcryptjs';

type JwtPayload = {
  userId: number;
};

/**
 * Generate a JWT for a given user id.
 */
export function signToken(userId: number): string {
  const secret = process.env.JWT_SECRET ?? 'fallback_secret';
  return jwt.sign({ userId }, secret, { expiresIn: '7d' });
}

/**
 * Verify a JWT and return the payload, or null if invalid.
 */
export function verifyToken(token: string): JwtPayload | null {
  const secret = process.env.JWT_SECRET ?? 'fallback_secret';
  try {
    return jwt.verify(token, secret) as JwtPayload;
  } catch {
    return null;
  }
}

/**
 * Middleware helper to extract the user from Authorization header.
 * Returns the Prisma User record if token is valid, otherwise null.
 */
export async function getUserFromRequest(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) return null;
  const token = authHeader.split(' ')[1];
  const payload = verifyToken(token);
  if (!payload) return null;
  return prisma.user.findUnique({ where: { id: payload.userId } });
}

/**
 * Utility to hash passwords.
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

/**
 * Verify password against stored hash.
 */
export async function comparePassword(
  password: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
