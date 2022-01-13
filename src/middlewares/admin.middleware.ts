import { Middleware } from '@decorators/express';
import { ForbiddenException } from '@exceptions/http-exception';
import { ExpressRequest } from '@interfaces/express.interface';
import { NextFunction, Request, Response } from 'express';

export class IsAdmin implements Middleware {
  public async use(request: Request, response: Response, next: NextFunction) {
    // if (!request.session.account.role) {
    //   throw new ForbiddenException('Access not allowed');
    // }

    // const isAdmin = request.session.account.role === 'ADMIN';

    // if (!isAdmin) {
    //   throw new ForbiddenException('Access not allowed');
    // }

    next();
  }
}
