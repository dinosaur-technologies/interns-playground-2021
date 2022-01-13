import { Controller, Post } from '@decorators/express';

@Controller('/webhooks/stripe')
export class StripWebhookController {
  @Post('/')
  async onPaymentComplete() {
    console.log(1);
  }
}
