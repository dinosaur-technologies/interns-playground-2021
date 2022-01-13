import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

export async function validate<T>(cls: ClassConstructor<any>, plain: any): Promise<T> {
  const object = plainToInstance(cls, plain);
  await validateOrReject(object);
  return object;
}
