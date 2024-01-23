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
  s3: {
    host: process.env.S3_HOST || 'localhost',
    port: parseInt(process.env.S3_PORT) || 9000,
    accessKeyId: process.env.S3_ACESS_KEY_ID || 'quakelog',
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || 'quakelog',
    forcePathStyle: process.env.S3_FORCE_PATH_STYLE === 'true',
    signatureVersion: process.env.S3_SIGNATURE_VERSION || 'v4',
  },
});
