import { webAPIRoutes } from '@servers/web-api/web-api.routes';
import { init } from '@providers/app.provider';
import { config } from '@providers/config.provider';
import request from 'supertest';
import { redis } from '@providers/redis.provider';

describe('Account', () => {
  let application;
  beforeAll(() => {
    let { app, logger } = init('Web Api', webAPIRoutes, [config.WEB_URL]);
    application = app;
  });

  afterAll(() => {
    redis.disconnect();
  });

  describe('Sign Up', () => {
    it('Validates Fields', async () => {
      const response = await request(application).post('/v1/account/signup');

      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBeDefined();
      expect(response.body.error.code).toBeDefined();
      expect(response.body.error.errors).toBeDefined();
      expect(response.body.error.message).toBeDefined();

      expect(response.body.meta).toBeDefined();
      expect(response.body.meta.requestID).toBeDefined();
      expect(response.body.meta.timestamp).toBeDefined();
      expect(response.body.meta.resource).toBe('/v1/account/signup');
    });

    it('Prevents Account Duplication', async () => {
      const response = await request(application).post('/v1/account/signup');

      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBeDefined();
      expect(response.body.error.code).toBeDefined();
      expect(response.body.error.errors).toBeDefined();
      expect(response.body.error.message).toBeDefined();

      expect(response.body.meta).toBeDefined();
      expect(response.body.meta.requestID).toBeDefined();
      expect(response.body.meta.timestamp).toBeDefined();
      expect(response.body.meta.resource).toBe('/v1/account/signup');
    });
  });
});
