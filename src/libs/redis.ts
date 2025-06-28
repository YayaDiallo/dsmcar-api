import env from '@/env.js';
import { createClient } from 'redis';

class RedisService {
  private client: ReturnType<typeof createClient>;
  constructor() {
    this.client = createClient({ url: env.REDIS_URL });
  }

  connect() {
    this.client
      .on('error', (err) => {
        console.error('Redis Client Error', err);
      })
      .connect();
  }

  setCache(key: string, value: string, ttl: number) {
    return this.client.set(key, value, {
      EX: ttl,
      NX: true, // Only set if the key does not already exist
    });
  }
  getCache(key: string) {
    return this.client.get(key);
  }
  deleteCache(key: string) {
    return this.client.del(key);
  }

  blacklistToken(token: string, ttl: number) {
    return this.setCache(token, 'true', ttl);
  }
  async isTokenBlacklisted(token: string) {
    const value = await this.getCache(token);
    return value === 'true';
  }
}

export const redisService = new RedisService();
