import { redis } from '@providers/redis.provider';

type Keys = 'EmailVerificationCode' | 'AccountRecoveryCode' | 'BusinessCount' | 'Menu';

interface FindParams {
  type: Keys;
  ID: string;
}

interface CreateParams extends FindParams {
  value: string;
  ttl?: number;
}

type DeleteParams = FindParams;

export class RedisService {
  set(params: CreateParams) {
    const { type, ID, value, ttl = 60 } = params;
    const key = `${type.trim()}:${ID.trim()}`;

    if (ttl) {
      return redis.set(key, value, 'EX', ttl);
    }

    return redis.set(key, value);
  }

  get(params: FindParams) {
    const { type, ID } = params;
    const key = `${type.trim()}:${ID.trim()}`;
    return redis.get(key);
  }

  delete(params: DeleteParams) {
    const { type, ID } = params;
    const key = `${type.trim()}:${ID.trim()}`;
    return redis.del(key);
  }
}
