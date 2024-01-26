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

  @Get(':id/kill-feed')
  findKillFeed(@Param('id') id: string) {
    return this.gameService.findKillFeed(id);
  }

  @Get(':id/kills-by-players')
  findKillsByPlayers(@Param('id') id: string) {
    return this.gameService.findKillsByPlayers(id);
  }

  @Get(':id/kills-by-means')
  findKillsByMeans(@Param('id') id: string) {
    return this.gameService.findKillsByMeans(id);
  }
}
