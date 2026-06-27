import { createClient } from 'redis';
import { env } from './env';

export const redisClient = createClient({
  url: env.REDIS_URL,
  socket: {
    reconnectStrategy: (retries) => {
      if (env.NODE_ENV === 'development') {
        return new Error('Redis Unavailable (Running without cache)');
      }
      return Math.min(retries * 50, 500); // Default backoff for production
    }
  }
});

redisClient.on('error', (err) => {
  if (env.NODE_ENV === 'development' && err.message === 'Redis Unavailable (Running without cache)') {
    return;
  }
  if (env.NODE_ENV === 'development' && err.code === 'ECONNREFUSED') {
    return;
  }
  console.error('Redis Client Error', err);
});

redisClient.on('connect', () => {}); // Let the startup validation handle the success log

export const connectRedis = async (): Promise<boolean> => {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
    }
    console.log('✅ Redis Connected');
    return true;
  } catch (error) {
    console.log('⚠️ Redis Unavailable (Running without cache)');
    return false;
  }
};
