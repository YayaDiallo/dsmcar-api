import env from '@/env.js';
import { createClient } from 'redis';

class RedisService {
  private static client: ReturnType<typeof createClient>;

  static {
    this.client = createClient({ url: env.REDIS_URL });
    this.client
      .on('error', (error) => {
        console.error('Redis Client Error', error);
      })
      .on('connect', () => {
        console.log(`Redis client connected successfully on ${env.REDIS_URL}`);
      })
      .connect();
  }

  setCache(key: string, value: string, ttl: number) {
    return RedisService.client.set(key, value, {
      EX: ttl,
      NX: true, // Only set if the key does not already exist
    });
  }
  getCache(key: string) {
    return RedisService.client.get(key);
  }
  deleteCache(key: string) {
    return RedisService.client.del(key);
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
