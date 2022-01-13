import { ConflictException, UnauthorizedException } from '@exceptions/http-exception';
import { SigninParams } from '@interfaces/account.interface';
import { Logger } from '@providers/logger.provider';
import { generateID } from '@providers/nanoid.provider';
import { AccountPublicSelect } from '@repositories/account.repository';
import { repositories } from '@repositories/index.repository';
import { AccountSigninDto, AccountSignupDto } from '@servers/web-api/account/account.dto';
import { services } from '@services/index.service';
import { Bcrypt } from '@utils/bcrypt.util';
import { dayjs } from '@utils/dayjs.util';

export class AccountService {
  private readonly logger = Logger('AccountService');
  private readonly repository = repositories.account;

  async signup(params: AccountSignupDto) {
    const { email, password, displayName } = params;
    const existing = await this.findOneByEmail(email);

    if (existing) {
      throw new ConflictException('Email is already in use');
    }

    const account = await this.repository.create({
      select: AccountPublicSelect,
      data: {
        ID: generateID(),
        displayName,
        email,
        password: await Bcrypt.CreateHash(password),
      },
    });

    return account;
  }

  async signin(params: SigninParams) {
    const { email, password } = params;

    const account = await this.repository.findFirst({
      where: {
        email,
      },
    });

    if (!account.password) {
      throw new UnauthorizedException('Password Not Set');
    }

    if (!account || (await Bcrypt.ComparePasswords(password, account.password)) === false) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    return this.findOneByID(account.ID);
  }

  findOneByEmail(email: string) {
    return this.repository.findFirst({
      select: AccountPublicSelect,
      where: {
        email,
      },
    });
  }

  findOneByID(ID: string) {
    return this.repository.findFirst({
      select: AccountPublicSelect,
      where: {
        ID,
      },
    });
  }

  requestPasswordRecoveryCode(email: string) {
    // TODO: Check if already exists
  }
}
