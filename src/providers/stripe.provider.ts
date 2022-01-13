import { config } from '@providers/config.provider';
import Stripe from 'stripe';

export const stripe = new Stripe(config.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
  typescript: true,
});
