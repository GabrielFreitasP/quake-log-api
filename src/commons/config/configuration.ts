export default () => ({
  port: parseInt(process.env.PORT) || 3000,
  reportExpireDays: Number(process.env.REPORT_EXPIRE_DAYS) || 10,
  database: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT) || 5432,
    username: process.env.DATABASE_USERNAME || 'quakelog',
    password: process.env.DATABASE_PASSWORD || 'quakelog',
    name: process.env.DATABASE_NAME || 'quakelog',
    synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
    logging: process.env.DATABASE_LOGGING === 'true',
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
  apis: {
    serasa: {
      baseUrl: process.env.SERASA_BASE_URL || '',
      timeout: process.env.SERASA_TIMEOUT || 15000,
    },
  },
});
