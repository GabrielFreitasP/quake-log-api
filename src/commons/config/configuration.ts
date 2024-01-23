import * as process from 'process';

export default () => ({
  port: parseInt(process.env.PORT) || 3000,
  database: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT) || 5432,
    username: process.env.DATABASE_USERNAME || 'quakelog',
    password: process.env.DATABASE_PASSWORD || 'quakelog',
    name: process.env.DATABASE_NAME || 'quakelog',
    synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
    logging: process.env.DATABASE_LOGGING === 'true',
    migrationsRun: process.env.DATABASE_MIGRATIONS_RUN === 'true',
  },
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIST_PORT) || 6379,
    password: process.env.REDIST_PASSWORD || 'redis2024',
  },
  files: {
    uploadPath: process.env.FILES_UPLOAD_PATH || './uploads',
    queueName: process.env.FILES_QUEUE_NAME || 'files-queue',
    jobName: process.env.FILES_JOB_NAME || 'files-job',
  },
  auth: {
    jwt: {
      secret: process.env.AUTH_JWT_SECRET || 'secretKey',
      expiresIn: process.env.AUTH_JWT_EXPIRES_IN || '3000',
    },
  },
  logger: {
    level: process.env.LOGGER_LEVEL || 'debug',
    label: process.env.LOGGER_LABEL || 'development',
  },
});
