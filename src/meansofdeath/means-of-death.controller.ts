import { Controller, Get, Param } from '@nestjs/common';
import { MeansOfDeathService } from './means-of-death.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('meansOfDeath')
@Controller('meansOfDeath')
export class MeansOfDeathController {
  constructor(private readonly playerService: MeansOfDeathService) {}

  @Get()
  findAll() {
    return this.playerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playerService.findOne(id);
  }
}
