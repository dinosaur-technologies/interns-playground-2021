import { config } from '@providers/config.provider';
import IORedis from 'ioredis';

export const redis = new IORedis(config.REDIS_URL);
