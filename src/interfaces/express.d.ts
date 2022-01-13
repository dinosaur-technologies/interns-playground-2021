import { AccountWithCustomFields } from '@interfaces/account.interface';

declare module 'http' {
  interface IncomingMessage {
    rawBody: any;
    id: string;
  }
}

declare module 'express' {
  interface Request {
    account: AccountWithCustomFields;
  }
}
