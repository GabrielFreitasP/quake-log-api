import { Controller, Get, Param } from '@nestjs/common';
import { KillService } from './kill.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('api/v1/kills')
@ApiTags('kills')
@ApiBearerAuth()
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
