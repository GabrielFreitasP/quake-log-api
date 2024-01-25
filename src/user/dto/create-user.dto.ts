import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsEnum,
  IsBoolean,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AuthRolesEnum } from '../../auth/enums/auth-roles.enum';

export class RequestUserDto {
  @ApiProperty({
    description: 'User name',
    example: 'John Beats',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'User email',
    example: 'johnbeats@company.com.br',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User password',
    example: '123456',
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    description: 'User profile',
    example: AuthRolesEnum.ADMIN,
  })
  @IsNotEmpty()
  @IsEnum(AuthRolesEnum)
  roles: string;

  @ApiProperty({
    description: 'User situation',
    example: true,
  })
  @IsBoolean()
  active = true;
}
