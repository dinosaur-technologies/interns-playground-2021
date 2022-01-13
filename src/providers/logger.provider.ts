import { config } from '@providers/config.provider';
import { Signale } from 'signale';

export const Logger = (name: string): Signale => {
  return new Signale({
    scope: `${config.NODE_ENV.toUpperCase()} ${name}`,
  });
};
