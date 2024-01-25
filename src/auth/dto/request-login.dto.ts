import { IsEmail, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';

export class RequestLoginDto {
  @ApiProperty({
    description: 'Email to login',
    example: 'admin@admin.com.br',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password to login',
    example: '123456',
  })
  @Transform(({ value }: TransformFnParams) => value.toString())
  @IsNotEmpty()
  @IsString()
  password: string;
}
