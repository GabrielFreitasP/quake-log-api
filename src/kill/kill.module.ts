import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KillService } from './kill.service';
import { KillController } from './kill.controller';
import { Kill } from './entities/kill.entity';
import { PlayerModule } from '../player/player.module';
import { MeansOfDeathModule } from '../meansofdeath/means-of-death.module';

@Module({
  imports: [TypeOrmModule.forFeature([Kill]), PlayerModule, MeansOfDeathModule],
  controllers: [KillController],
  providers: [KillService],
  exports: [KillService],
})
export class KillModule {}
