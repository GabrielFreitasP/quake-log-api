import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KillService } from './kill.service';
import { KillController } from './kill.controller';
import { Kill } from './entities/kill.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Kill])],
  controllers: [KillController],
  providers: [KillService],
})
export class KillModule {}
