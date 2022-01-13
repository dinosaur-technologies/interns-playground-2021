import { init } from '@providers/app.provider';
import { config } from '@providers/config.provider';
import { webAPIRoutes } from '@servers/web-api/web-api.routes';

const { app, logger } = init('Public Api', webAPIRoutes, [config.WEB_URL]);

app.listen(config.WEB_API_PORT, async () => {
  try {
  } catch (error) {
    console.error(error);
  }

  logger.success(`Web API is listening on port: ${config.WEB_API_PORT}`, config);
});
