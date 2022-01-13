require('source-map-support').install();
import { Router } from 'express';
import { redis } from '@providers/redis.provider';
import { globalErrorHandler } from '@middlewares/error.middleware';
import { rateLimiter } from '@middlewares/rate-limit.middleware';
import { config } from '@providers/config.provider';
import { Logger } from '@providers/logger.provider';
import { json, urlencoded } from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import mung from 'express-mung';
import requestID from 'express-request-id';
import helmet from 'helmet';
import morgan from 'morgan';
import session, { CookieOptions, SessionOptions } from 'express-session';
import { attachControllers } from '@decorators/express';
import { dayjs } from '@utils/dayjs.util';

export const init = (name: string, controllers: any[], origin: string[]) => {
  if (!name) {
    throw new Error('Application name is required');
  }

  const app = express();
  const logger = Logger(name);

  morgan.token('requestID', (req) => {
    return req.id;
  });

  app.use(
    json(),
    urlencoded({
      extended: false,
    }),
    compression(),
    helmet({
      contentSecurityPolicy: false,
    }),
    requestID(),
    cookieParser(),
    morgan('[:date[web]] :requestID :method :url :status - :response-time ms'),
    cors({
      credentials: true,
      origin,
    })
  );

  app.set('trust proxy', 1);

  app.use(
    rateLimiter({
      max: 100,
      windowMs: 1 * 60 * 1_000,
    })
  );

  app.use(
    mung.json((data, req, res) => {
      const timestamp = dayjs().utc().format();
      return {
        data,
        meta: {
          statusCode: res.statusCode,
          resource: req.originalUrl,
          timestamp,
          requestID: req.id,
        },
      };
    })
  );

  const RedisStore = require('connect-redis')(session);

  const sessionOptions: SessionOptions = {
    name: config.SESSION_NAME,
    store: new RedisStore({
      client: redis,
    }),
    secret: config.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
    } as CookieOptions,
  };

  app.use(session(sessionOptions));

  const router = Router();
  attachControllers(router, controllers);
  app.use('/v1', router);

  app.use((request, response, next) => {
    const timestamp = dayjs().utc().format();
    request.setTimeout(60 * 1_000 * 10, () => {
      return response.status(408).json({
        error: {
          statusCode: 408,
          code: 'RequestTimedOut',
          message: 'Request Timed Out',
        },
        meta: {
          resource: request.originalUrl,
          timestamp,
          requestID: request.id,
        },
      });
    });
    next();
  });

  app.use(globalErrorHandler());
  return {
    app,
    logger,
  };
};
