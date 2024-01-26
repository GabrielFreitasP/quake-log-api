import { Controller, Get, Param } from '@nestjs/common';
import { MeansOfDeathService } from './means-of-death.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('api/v1/means-of-death')
@ApiTags('means-of-death')
@ApiBearerAuth()
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
