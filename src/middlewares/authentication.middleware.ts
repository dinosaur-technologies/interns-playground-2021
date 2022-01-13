import { Middleware } from '@decorators/express';
import { UnauthorizedException } from '@exceptions/http-exception';
import { Logger } from '@providers/logger.provider';
import { services } from '@services/index.service';
import { NextFunction, Request, Response } from 'express';

export class Authenticated implements Middleware {
  private logger = Logger('Authenticated Middleware');
  public async use(req: Request, res: Response, next: NextFunction) {
    if (!req.session.account) {
      this.logger.info('Session Not Found');
      return next(new UnauthorizedException('Invalid Credentials'));
    }

    const account = await services.account.findOneByID(req.session.account.ID);

    if (!account) {
      this.logger.info('Account Not Found');
      return next(new UnauthorizedException('Unauthorized'));
    }

    this.logger.info('Found', account);

    next();
  }
}
