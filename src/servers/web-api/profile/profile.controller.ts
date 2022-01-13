import { Logger } from '@providers/logger.provider';
import { NextFunction, Request, Response } from 'express';

export class ProfileController {
  private logger = Logger('ProfileController');

  updateProfile = () => {};

  get = async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.status(200).json(req.account);
    } catch (error) {
      this.logger.fatal(error);
      next(error);
    }
  };

  update = async (req, res, next) => {};
}
