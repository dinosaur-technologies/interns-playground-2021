export enum ErrorCodes {
  AuthorizationError = 'AuthorizationError',
  MissingToken = 'MissingTokenError',
  InvalidToken = 'InvalidTokenError',
  AccessDenied = 'AccessDeniedError',
  TooManyRequests = 'TooManyRequestsError',
  ValidationError = 'ValidationError',
  ResourceNotFound = 'ResourceNotFoundError',
  Conflict = 'ConflictError',
  UnprocessableEntityError = 'UnprocessableEntityError',
}

export interface ErrorField {
  field: string;
  location: 'body';
  description: string;
}

export interface ErrorResponse {
  code: ErrorCodes;
  errors?: ErrorField;
  message: string;
  resource: string;
  timestamp: string;
  requestID: string;
}
