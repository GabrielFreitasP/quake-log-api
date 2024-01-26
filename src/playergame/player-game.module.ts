import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerGameService } from './player-game.service';
import { PlayerGame } from './entities/player-game.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlayerGame])],
  providers: [PlayerGameService],
  exports: [PlayerGameService],
})
export class PlayerGameModule {}
