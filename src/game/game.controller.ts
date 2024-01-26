import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { GameService } from './game.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthRolesEnum } from '../auth/enums/auth-roles.enum';
import { Roles } from '../commons/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/role.guard';

@Controller('api/v1/games')
@ApiTags('games')
@ApiBearerAuth()
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AuthRolesEnum.ADMIN)
  @Get()
  findAll() {
    return this.gameService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AuthRolesEnum.ADMIN)
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.gameService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AuthRolesEnum.ADMIN)
  @Get(':id/kill-feed')
  findKillFeed(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.gameService.findKillFeed(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AuthRolesEnum.ADMIN)
  @Get(':id/kills-by-players')
  findKillsByPlayers(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.gameService.findKillsByPlayers(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AuthRolesEnum.ADMIN)
  @Get(':id/kills-by-means')
  findKillsByMeans(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.gameService.findKillsByMeans(id);
  }
}
