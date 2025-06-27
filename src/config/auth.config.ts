export const authConfig = {
  jwtSecret: process.env.JWT_SECRET || 'jwt_secret',
  jwtLifeTime: process.env.JWT_LIFE_TIME || '1h',
};
