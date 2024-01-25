import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

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
  migrations: ['./migrations/*{.ts,.js}'],
  synchronize: envConfig.synchronize,
  logging: envConfig.logging,
  namingStrategy: new SnakeNamingStrategy(),
};

export const AppDataSource = new DataSource(DataSourceOptions);
