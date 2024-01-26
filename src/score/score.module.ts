import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScoreService } from './score.service';
import { Score } from './entities/score.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Score])],
  providers: [ScoreService],
  exports: [ScoreService],
})
export class ScoreModule {}
