import env from '@/env.js';

export const appConfig = {
  port: env.PORT,
  origins: [env.DSMCAR_CLIENT_URL],
};
