// src/lib/server/redisClient.ts
import Redis from 'ioredis';

import { config } from '$lib/config/config';
const redisUrl = config.REDIS_URL;

// Singleton pattern to reuse connection
let redis: Redis;

if (!globalThis.__redis) {
  globalThis.__redis = new Redis(redisUrl);
}


if (!redis) {
  redis = new Redis(redisUrl, {
    maxRetriesPerRequest: null, // optional: disables noisy retry warnings
    connectTimeout: 10000,
  });

  redis.on('connect', () => console.log('✅ Connected to Redis'));
  redis.on('error', (err) => console.error('❌ Redis error:', err));
}

export { redis };
