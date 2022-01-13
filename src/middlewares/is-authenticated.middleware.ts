// import { NextFunction, Request, Response } from 'express';
// import { ErrorResponse } from 'interfaces';
// import { services } from '@services/index.service';
// import { HttpException, UnauthorizedException } from '@exceptions/http-exception';
// import { HttpStatus } from '@enums/http-status.enum';

// export const isAuthenticated = async (
//   req: Request,
//   res: Response<ErrorResponse>,
//   next: NextFunction
// ) => {
//   if (!req.session.account) {
//     return next(new HttpException(HttpStatus.UNAUTHORIZED, 'Invalid Credentials'));
//   }

//   const account = await services.account.findOneByID(req.session.account.id);

//   if (!account) {
//     return next(new UnauthorizedException('Unauthorized'));
//   }

//   next();
// };
