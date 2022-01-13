import { Prisma, PrismaClient } from '@prisma/client';
import { config } from '@providers/config.provider';
import { Logger } from '@providers/logger.provider';
import { dayjs } from '@utils/dayjs.util';

const logger = Logger('Prisma');

const prismaWriteConnection = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'stdout',
      level: 'error',
    },
    {
      emit: 'stdout',
      level: 'info',
    },
    {
      emit: 'stdout',
      level: 'warn',
    },
  ],
  datasources: {
    db: {
      url: config.DATABASE_URL,
    },
  },
});

const prismaReadConnection = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'stdout',
      level: 'error',
    },
    {
      emit: 'stdout',
      level: 'info',
    },
    {
      emit: 'stdout',
      level: 'warn',
    },
  ],
  datasources: {
    db: {
      url: config.DATABASE_READ_REPLICA_URL,
    },
  },
});

const timeColumns = [
  'createdAt',
  'updatedAt',
  'lastActiveAt',
  'verifiedAt',
  'inboundDate',
  'processedAt',
  'completedAt',
];

export const formatTime = (json: any) => {
  for (const key in json) {
    if (timeColumns.includes(key)) {
      if (json[key]) {
        json[key] = dayjs(json[key]).utc().format();
      }
    }

    if (typeof json[key] === 'object') {
      formatTime(json[key]);
    }
  }
};

async function formatTimeFields(
  params: Prisma.MiddlewareParams,
  next: (params: Prisma.MiddlewareParams) => Promise<any>
) {
  const result = await next(params);
  if (result) {
    if (result.constructor === Object) {
      formatTime(result);
    } else if (result.constructor === Array) {
      result.map((result) => formatTime(result));
    }
  }

  return result;
}

prismaWriteConnection.$use(formatTimeFields);
prismaReadConnection.$use(formatTimeFields);

const displayLog = (e: Prisma.QueryEvent) => {
  logger.log('Query: ' + e.query);
  logger.log('Params: ' + e.params);
  logger.log('Duration: ' + e.duration + 'ms');
};

prismaWriteConnection.$on('query', displayLog);
prismaReadConnection.$on('query', displayLog);

export const db = {
  write: prismaWriteConnection,
  read: prismaReadConnection,
};
