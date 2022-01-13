import { config } from '@providers/config.provider';
import { dayjs } from '@utils/dayjs.util';
import { Response } from 'express';
import rateLimit from 'express-rate-limit';
import RateLimitRedis from 'rate-limit-redis';
import { ErrorCodes, ErrorResponse } from '@interfaces/errors';
import { redis } from '@providers/redis.provider';

export const rateLimiter = (options: Pick<rateLimit.Options, 'windowMs' | 'max'> = {}) => {
  const { windowMs = 1 * 60 * 1_000, max = 1 } = options;

  return rateLimit({
    store: new RateLimitRedis({
      client: redis,
    }),
    windowMs,
    max,
    handler: (req, res: Response) => {
      return res.status(429).json({
        error: {
          code: ErrorCodes.TooManyRequests,
          message: `You're trying that too often`,
          resource: req.originalUrl,
          timestamp: dayjs().utc().format(),
          requestID: req.id,
        } as ErrorResponse,
      });
    },
  });
};
