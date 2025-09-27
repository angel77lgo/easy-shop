import {
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import e, { Request, Response } from 'express';
import { ErrorCodes, ErrorResponseDto } from '../dto/error-response.dto';
import { CustomException } from '../custom.exception';

export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let errorResponse: ErrorResponseDto;
    let statusCode: HttpStatus;

    if (exception instanceof CustomException) {
      statusCode = exception.getStatus();
      errorResponse = new ErrorResponseDto(
        exception.errorCode,
        exception.message,
        request.url,
        exception.details,
      );
    } else if (exception instanceof HttpException) {
      const exceptionResponse = exception.getResponse();
      statusCode = exception.getStatus();

      if (typeof exceptionResponse === 'string') {
        errorResponse = new ErrorResponseDto(
          this.getErrorCodeFromStatus(statusCode),
          exceptionResponse,
          request.url,
        );
      } else if (typeof exceptionResponse === 'object') {
        errorResponse = new ErrorResponseDto(
          this.getErrorCodeFromStatus(statusCode),
          (exceptionResponse as any).message || exception.message,
          request.url,
          (exceptionResponse as any).error || exceptionResponse,
        );
      } else {
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        errorResponse = new ErrorResponseDto(
          ErrorCodes.INTERNAL_SERVER_ERROR,
          exception.message,
          request.url,
        );
      }
    } else {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      errorResponse = new ErrorResponseDto(
        ErrorCodes.INTERNAL_SERVER_ERROR,
        (exception as any)?.message || 'Internal server error',
        request.url,
        (exception as any)?.stack || null,
      );
    }
    response.status(statusCode).json(errorResponse);
  }

  private getErrorCodeFromStatus(statusCode: HttpStatus): ErrorCodes {
    switch (statusCode) {
      case HttpStatus.BAD_REQUEST:
        return ErrorCodes.VALIDATION_ERROR;
      case HttpStatus.UNAUTHORIZED:
        return ErrorCodes.UNAUTHORIZED;
      case HttpStatus.FORBIDDEN:
        return ErrorCodes.FORBIDDEN;
      case HttpStatus.NOT_FOUND:
        return ErrorCodes.RESOURCE_NOT_FOUND;
      case HttpStatus.CONFLICT:
        return ErrorCodes.RESOURCE_ALREADY_EXISTS;
      default:
        return ErrorCodes.INTERNAL_SERVER_ERROR;
    }
  }
}
