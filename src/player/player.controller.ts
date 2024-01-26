import { Controller, Get, Param } from '@nestjs/common';
import { PlayerService } from './player.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('api/v1/players')
@ApiTags('players')
@ApiBearerAuth()
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Get()
  findAll() {
    return this.playerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playerService.findOne(id);
  }
}
