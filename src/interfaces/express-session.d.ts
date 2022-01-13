import { AccountWithCustomFields } from '@interfaces/account.interface';

declare module 'express-session' {
  interface SessionData {
    account: AccountWithCustomFields;
  }
}
