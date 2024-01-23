import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidArgumentException extends HttpException {
  constructor(argumentName: any, error = 'Bad Request') {
    super(
      HttpException.createBody(
        `Invalid argument '${Object.keys(argumentName)[0]}'`,
        error,
        HttpStatus.BAD_REQUEST,
      ),
      HttpStatus.BAD_REQUEST,
    );
  }
}
