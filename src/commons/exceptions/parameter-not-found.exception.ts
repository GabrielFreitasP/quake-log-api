import { HttpException, HttpStatus } from '@nestjs/common';

export class ParameterNotFoundException extends HttpException {
  constructor(argumentName: any, error = 'Bad Request') {
    super(
      HttpException.createBody(
        `'${Object.keys(argumentName)[0]}' parameter not found`,
        error,
        HttpStatus.BAD_REQUEST,
      ),
      HttpStatus.BAD_REQUEST,
    );
  }
}
