import { DataSource } from 'typeorm';
import configuration from './src/commons/config/configuration';

const envConfig = configuration().database;

export const DataSourceOptions = {
  type: 'postgres' as const,
  host: envConfig.host,
  port: envConfig.port,
  username: envConfig.username,
  password: envConfig.password,
  database: envConfig.name,
  entities: [__dirname + '/**/*.entity.js'],
  synchronize: envConfig.synchronize,
  logging: envConfig.logging,
  migrations: [__dirname + '/migrations/*.js'],
};

export const AppDataSource = new DataSource(DataSourceOptions);
