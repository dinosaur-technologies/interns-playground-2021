import bcrypt from 'bcryptjs';

const SALT_ROUND = 12;

export class Bcrypt {
  static async CreateHash(password: string): Promise<string> {
    const saltRound = await bcrypt.genSalt(SALT_ROUND);
    return bcrypt.hash(password, saltRound);
  }

  static ComparePasswords(passwordClaim: string, passwordHash: string): Promise<boolean> {
    return bcrypt.compare(passwordClaim, passwordHash);
  }
}
