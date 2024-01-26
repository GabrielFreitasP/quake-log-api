import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerService } from './player.service';
import { PlayerController } from './player.controller';
import { Player } from './entities/player.entity';
import { LoggerModule } from '../commons/logger/logger.module';

@Module({
  imports: [TypeOrmModule.forFeature([Player]), LoggerModule],
  controllers: [PlayerController],
  providers: [PlayerService],
  exports: [PlayerService],
})
export class PlayerModule {}
