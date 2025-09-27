import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorCodes } from './dto/error-response.dto';

export class CustomException extends HttpException {
  constructor(
    public readonly errorCode: ErrorCodes,
    message: string,
    statusCode: HttpStatus,
    public readonly details?: any,
  ) {
    super(message, statusCode);
  }
}

export class ValidationException extends CustomException {
  constructor(message: string) {
    super(ErrorCodes.VALIDATION_ERROR, message, HttpStatus.BAD_REQUEST);
  }
}

export class NotFoundException extends CustomException {
  constructor(resource: string, identifier?: any) {
    const message = identifier
      ? `${resource} with value ${identifier} not found`
      : `${resource} not found`;
    super(ErrorCodes.RESOURCE_NOT_FOUND, message, HttpStatus.NOT_FOUND);
  }
}

export class ConflictException extends CustomException {
  constructor(resource: string, field?: string) {
    const message = field
      ? `${resource} with this ${field} already exists`
      : `${resource} already exists`;
    super(ErrorCodes.RESOURCE_ALREADY_EXISTS, message, HttpStatus.CONFLICT);
  }
}
