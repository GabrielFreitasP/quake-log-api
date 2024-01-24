import { Controller, Get, Param } from '@nestjs/common';
import { KillService } from './kill.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('players')
@Controller('players')
export class KillController {
  constructor(private readonly playerService: KillService) {}

  @Get()
  findAll() {
    return this.playerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playerService.findOne(id);
  }
}
