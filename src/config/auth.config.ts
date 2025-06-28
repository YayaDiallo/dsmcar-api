import { SignOptions } from 'jsonwebtoken';

export const authConfig = {
  jwtSecret: process.env.JWT_SECRET || 'jwt_secret',
  jwtLifeTime: process.env.JWT_LIFE_TIME as SignOptions['expiresIn'],
};
