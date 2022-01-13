import { HealthcheckController } from '@controllers/healthcheck/healthcheck.controller';
import { AccountController } from '@servers/web-api/account/account.controller';
import { UploadsController } from '@servers/web-api/uploads/uploads.controller';
import { StripWebhookController } from '@servers/web-api/webhook/stripe-webhook.controller';

export const webAPIRoutes = [
  HealthcheckController,
  AccountController,
  UploadsController,
  StripWebhookController,
];
