import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { MeansOfDeathService } from './means-of-death.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { Roles } from '../commons/decorators/roles.decorator';
import { AuthRolesEnum } from '../auth/enums/auth-roles.enum';

@Controller('api/v1/means-of-death')
@ApiTags('means-of-death')
@ApiBearerAuth()
export class MeansOfDeathController {
  constructor(private readonly playerService: MeansOfDeathService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AuthRolesEnum.ADMIN)
  @Get()
  findAll() {
    return this.playerService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AuthRolesEnum.ADMIN)
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.playerService.findOne(id);
  }
}
