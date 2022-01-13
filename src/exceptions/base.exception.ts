import { ErrorField } from '@interfaces/errors';

export abstract class BaseException {
  code: string;
  statusCode: number;
  message: string;
  errors: ErrorField;
}
