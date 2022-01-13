import { webAPIRoutes } from '@servers/web-api/web-api.routes';
import { init } from '@providers/app.provider';
import { config } from '@providers/config.provider';
import request from 'supertest';
import { redis } from '@providers/redis.provider';

describe('Healthcheck', () => {
  let application;
  beforeAll(() => {
    let { app, logger } = init('Web Api', webAPIRoutes, [config.WEB_URL]);
    application = app;
  });

  afterAll(() => {
    redis.disconnect();
  });

  it('Returns 200', async () => {
    const response = await request(application).get('/v1/healthcheck');

    expect(response.statusCode).toBe(200);
    expect(response.body.data).toBeDefined();

    expect(response.body.meta).toBeDefined();
    expect(response.body.meta.requestID).toBeDefined();
    expect(response.body.meta.timestamp).toBeDefined();
    expect(response.body.meta.resource).toBe('/v1/healthcheck');
  });
});
