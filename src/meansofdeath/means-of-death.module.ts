import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeansOfDeathService } from './means-of-death.service';
import { MeansOfDeathController } from './means-of-death.controller';
import { MeansOfDeath } from './entities/means-of-death.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MeansOfDeath])],
  controllers: [MeansOfDeathController],
  providers: [MeansOfDeathService],
  exports: [MeansOfDeathService],
})
export class MeansOfDeathModule {}
