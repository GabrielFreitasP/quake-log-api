import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { LoggerModule } from '../commons/logger/logger.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigurationModule } from '../commons/config/configuration.module';
import { User } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    LoggerModule,
    ConfigurationModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
