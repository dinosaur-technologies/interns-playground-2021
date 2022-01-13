import dotenv from 'dotenv';
const environment = process.env.NODE_ENV;

if (['development', 'production'].includes(environment.toLocaleLowerCase()) === false) {
  throw new Error('$NODE_ENV is required');
}

dotenv.config();

export const config = {
  NODE_ENV: process.env.NODE_ENV,
  IS_DEVELOPMENT: environment.toLowerCase() === 'development',
  IS_PRODUCTION: environment.toLowerCase() === 'production',

  ADMIN_API_PORT: Number(process.env.ADMIN_API_PORT),
  WEB_API_CPU_COUNT: Number(process.env.WEB_API_CPU_COUNT),
  WEB_API_PORT: Number(process.env.WEB_API_PORT),
  WEB_URL: process.env.WEB_URL,

  MOBILE_API_PORT: Number(process.env.MOBILE_API_PORT),

  DATABASE_URL: process.env.DATABASE_URL,
  DATABASE_READ_REPLICA_URL: process.env.DATABASE_READ_REPLICA_URL,

  GOOGLE_APPLICATION_CREDENTIALS: process.env.GOOGLE_APPLICATION_CREDENTIALS,

  REDIS_URL: process.env.REDIS_URL,

  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,

  S3_BUCKET: process.env.S3_BUCKET,
  S3_REGION: process.env.S3_REGION,
  S3_ACCESS_KEY: process.env.S3_ACCESS_KEY,
  S3_SECRET_KEY: process.env.S3_SECRET_KEY,

  SESSION_NAME: process.env.SESSION_NAME,
  SESSION_SECRET: process.env.SESSION_SECRET,

  SELECT_LIMIT: Number(process.env.SELECT_LIMIT) || 25,
};

validateEnvironmentVariables();

function validateEnvironmentVariables() {
  const { IS_DEVELOPMENT, IS_PRODUCTION, ...requiredConfig } = config;

  for (const [key, value] of Object.entries(requiredConfig)) {
    if (!value) {
      throw new Error(`${key} is not set`);
    }
  }
}
