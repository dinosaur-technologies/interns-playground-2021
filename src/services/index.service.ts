import { AccountService } from '@services/account.service';
import { RedisService } from '@services/redis.service';
import { S3Service } from '@services/s3.service';

export const services = {
  account: new AccountService(),
  redis: new RedisService(),
  s3: new S3Service(),
};
