import env from '@/env.js';
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
export const db = drizzle(env.DATABASE_URL!);
