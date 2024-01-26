import { Controller, Post, HttpCode, Body } from '@nestjs/common';
import { ApiResponse, ApiTags, ApiBody, ApiOperation } from '@nestjs/swagger';
import { UserService } from './user.service';
import { RequestUserDto } from './dto/create-user.dto';

@Controller('api/v1/users')
@ApiTags('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @HttpCode(201)
  @ApiBody({ type: RequestUserDto })
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created' })
  @ApiResponse({ status: 401, description: 'Not authorized' })
  @ApiResponse({ status: 403, description: 'Not allowed' })
  create(@Body() userCreateDto: RequestUserDto) {
    return this.userService.create(userCreateDto);
  }
}
