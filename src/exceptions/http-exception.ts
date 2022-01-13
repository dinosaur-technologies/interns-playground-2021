import { HttpStatus } from '@enums/http-status.enum';
import { BaseException } from '@exceptions/base.exception';
import { pascalCase } from 'pascal-case';

export class HttpException extends BaseException {
  statusCode: HttpStatus;
  code: string;
  message: string;
  constructor(status: HttpStatus, message: string) {
    super();
    this.statusCode = status;
    this.message = message;
    this.code = pascalCase(message);
  }
}

export class BadRequestException extends HttpException {
  constructor(message: string) {
    super(HttpStatus.BAD_REQUEST, message);
  }
}

export class UnauthorizedException extends HttpException {
  constructor(message: string) {
    super(HttpStatus.UNAUTHORIZED, message);
  }
}
export class ForbiddenException extends HttpException {
  constructor(message: string) {
    super(HttpStatus.FORBIDDEN, message);
  }
}

export class NotFoundException extends HttpException {
  constructor(message: string) {
    super(HttpStatus.NOT_FOUND, message);
  }
}

export class ConflictException extends HttpException {
  constructor(message: string) {
    super(HttpStatus.CONFLICT, message);
  }
}
