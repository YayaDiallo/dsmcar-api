import env from '@/env.js';
import { SignOptions } from 'jsonwebtoken';

export const authConfig = {
  jwtSecret: env.JWT_SECRET,
  jwtLifeTime: (env.JWT_LIFE_TIME as SignOptions['expiresIn']) || '1h',
};
