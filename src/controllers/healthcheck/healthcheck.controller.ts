import { Controller, Get } from '@decorators/express';
import { dayjs } from '@utils/dayjs.util';
import { NextFunction, Request, Response } from 'express';

@Controller('/')
export class HealthcheckController {
  @Get('/healthcheck')
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      return res.status(200).json({
        status: '🚀 Server is up and running',
        resource: req.originalUrl,
        timestamp: dayjs.utc().format(),
        requestID: req.id,
      });
    } catch (error) {
      next(error);
    }
  }
}
