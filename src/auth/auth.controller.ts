import { Controller, HttpCode, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequestLoginDto } from './dto/request-login.dto';
import { ResponseLoginDto } from './dto/response-login.dto';

@Controller('api/v1/auth')
@ApiTags('login')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Login to the API' })
  @ApiBody({ type: RequestLoginDto })
  @ApiResponse({
    status: 200,
    description: 'Access token',
    type: ResponseLoginDto,
  })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
