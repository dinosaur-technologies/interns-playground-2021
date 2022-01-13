import { Prisma } from '@prisma/client';
import { db } from '@providers/db.provider';

export const AccountPublicSelect = Prisma.validator<Prisma.AccountSelect>()({
  ID: true,
  email: true,
  displayName: true,
  imageURL: true,
  createdAt: true,
});

export class AccountRepository {
  create(params: Prisma.AccountCreateArgs) {
    return db.write.account.create(params);
  }

  findFirst(params: Prisma.AccountFindFirstArgs) {
    return db.read.account.findFirst(params);
  }

  findMany(params: Prisma.AccountFindManyArgs) {
    return db.read.account.findMany(params);
  }

  update(params: Prisma.AccountUpdateArgs) {
    return db.write.account.update(params);
  }

  delete(params: Prisma.AccountDeleteArgs) {
    return db.write.account.delete(params);
  }
}
