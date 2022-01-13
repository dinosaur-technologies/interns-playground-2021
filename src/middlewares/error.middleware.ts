import { BaseException } from '@exceptions/base.exception';
import { dayjs } from '@utils/dayjs.util';
import { ValidationError } from 'class-validator';
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

export const globalErrorHandler = () => {
  return (
    error: ErrorRequestHandler & { statusCode: number },
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const timestamp = dayjs().utc().format();

    if (error.length && error.constructor === Array) {
      return res.status(400).json({
        error: {
          code: 'ValidationError',
          message: 'Validation Error',
          errors: (error as ValidationError[]).map((e) => {
            // Handle Arrays
            if (e.children && e.children.length) {
              const [child] = e?.children;
              const [grandChild] = child?.children;

              return {
                [e.property]: grandChild.constraints,
              };
            }

            return {
              [e.property]: e.constraints,
            };
          }),
        },
        meta: {
          statusCode: 400,
          resource: req.originalUrl,
          timestamp,
          requestID: req.id,
        },
      });
    }

    if (error instanceof BaseException) {
      return res.status(error.statusCode).json({
        error: {
          code: error.code,
          message: error.message,
          errors: error.errors ?? error.errors,
        },
        meta: {
          statusCode: error.statusCode,
          resource: req.originalUrl,
          timestamp,
          requestID: req.id,
        },
      });
    }

    return res.status(500).json({
      error: {
        code: 'InternalServerError',
        message: 'Something went wrong',
      },
      meta: {
        statusCode: error.statusCode,
        resource: req.originalUrl,
        timestamp,
        requestID: req.id,
      },
    });
  };
};
