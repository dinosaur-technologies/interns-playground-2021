import { Controller, Delete, Next, Post, Put, Request, Response } from '@decorators/express';
import {
  ExpressNextFunction,
  ExpressRequest,
  ExpressResponse,
} from '@interfaces/express.interface';
import { Logger } from '@providers/logger.provider';
import {
  AccountSigninDto,
  AccountSignupDto,
  AccountSignupWithProviderDto,
  RecoverAccountDto,
} from '@servers/web-api/account/account.dto';
import { services } from '@services/index.service';
import { validate } from '@utils/validate';

@Controller('/account')
export class AccountController {
  private readonly logger = Logger('AccountController');

  @Put('/')
  async update(
    @Request() request: ExpressRequest,
    @Response() response: ExpressResponse,
    @Next() next: ExpressNextFunction
  ) {
    return response.status(200).json(request.session.account);
  }

  @Post('/signup')
  async signup(
    @Request() request: ExpressRequest,
    @Response() response: ExpressResponse,
    @Next() next: ExpressNextFunction
  ) {
    try {
      const body = await validate<AccountSignupDto>(AccountSignupDto, request.body);
      const account = await services.account.signup(body);

      return response.status(200).json(account);
    } catch (error) {
      this.logger.fatal(error);
      next(error);
    }
  }

  @Post('/signin')
  async signin(
    @Request() request: ExpressRequest,
    @Response() response: ExpressResponse,
    @Next() next: ExpressNextFunction
  ) {
    try {
      const body = await validate<AccountSigninDto>(AccountSigninDto, request.body);
      const account = await services.account.signin(body);
      request.session.account = account;
      return response.status(200).json(account);
    } catch (error) {
      this.logger.fatal(error);
      next(error);
    }
  }

  @Post('/recover')
  async recover(
    @Request() request: ExpressRequest,
    @Response() response: ExpressResponse,
    @Next() next: ExpressNextFunction
  ) {
    try {
      const body = await validate<RecoverAccountDto>(RecoverAccountDto, request.body);
      // TODO: Implement

      return response.sendStatus(202);

      // const existing = await services.redis.get({
      //   type: 'AccountRecoveryCode',
      //   ID: body.email,
      // });
      // if (existing) {
      // }
    } catch (error) {
      this.logger.fatal(error);
      next(error);
    }

    // TODO: Implement password reset
  }

  @Post('/reset')
  async reset(@Request() request: ExpressRequest, @Response() response: ExpressResponse) {
    // Check token
    // Check email
    //
  }

  @Delete('/signout')
  async signout(
    @Request() request: ExpressRequest,
    @Response() response: ExpressResponse,
    @Next() next: ExpressNextFunction
  ) {
    try {
      request.session.destroy(() => {
        return response.sendStatus(204);
      });
    } catch (error) {
      this.logger.fatal(error);
      next(error);
    }
  }
}
