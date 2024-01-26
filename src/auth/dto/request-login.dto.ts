import { IsEmail, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';

export class RequestLoginDto {
  @ApiProperty({ description: 'Login email', example: 'johnbeats@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Login password', example: '123456' })
  @Transform(({ value }: TransformFnParams) => value.toString())
  @IsNotEmpty()
  @IsString()
  password: string;
}
