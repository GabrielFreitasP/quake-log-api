import { Controller, Get, Param } from '@nestjs/common';
import { GameService } from './game.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('games')
@Controller('games')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get()
  findAll() {
    return this.gameService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gameService.findOne(id);
  }
}
