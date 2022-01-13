import { Prisma } from '@prisma/client';
import { AccountSigninDto } from '@servers/web-api/account/account.dto';
import { services } from 'services/index.service';

const method = services.account.findOneByID;

export type AccountWithCustomFields = Prisma.PromiseReturnType<typeof method>;

export interface SigninParams extends AccountSigninDto {}
