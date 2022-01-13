import { IsDefined, IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class AccountSignupDto {
  @IsDefined({
    message: 'Email is required',
  })
  @IsEmail(
    {},
    {
      message: 'A valid email is required',
    }
  )
  email: string;

  @IsDefined()
  @Length(8, 100)
  password: string;

  @IsOptional()
  @IsString({
    message: 'Display name must be a string',
  })
  displayName?: string;
}

export class AccountSignupWithProviderDto {
  @IsDefined({
    message: 'Token is required',
  })
  token: string;
}

export class AccountSigninDto extends AccountSignupDto {}

export class RecoverAccountDto {
  @IsDefined()
  @IsEmail()
  email: string;
}
