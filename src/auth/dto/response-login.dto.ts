import { ApiProperty } from '@nestjs/swagger';

export class ResponseLoginDto {
  @ApiProperty({
    description: 'Received token email',
    example: 'admin@admin.com.br',
  })
  email: string;

  @ApiProperty({
    description: 'Token to be used to access the API',
    example: '$2y$04$cYSc/jadfCXbodVtFKK8gOjmJER4UyY23Aw7ncstJ571yfcB.6TZC',
  })
  accessToken: string;

  @ApiProperty({
    description: 'Token expiration time',
    example: '3000s',
  })
  expiresIn: string;
}
