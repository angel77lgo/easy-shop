export class ErrorResponseDto {
  success: boolean;
  error: {
    code: string;
    message: string;
    details?: any;
    timestamp: string;
    path: string;
  };

  constructor(code: string, message: string, path: string, details?: any) {
    this.success = false;
    this.error = {
      code,
      message,
      details,
      timestamp: new Date().toISOString(),
      path,
    };
  }
}

export enum ErrorCodes {
  //Validation Errors
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  INVALID_INPUT = 'INVALID_INPUT',

  //Resource errors
  RESOURCE_NOT_FOUND = 'RESOURCE_NOT_FOUND',
  RESOURCE_ALREADY_EXISTS = 'RESOURCE_ALREADY_EXISTS',

  //Authentication/Authorization errors
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  INVALID_TOKEN = 'INVALID_TOKEN',

  //Database errors
  DATABASE_ERROR = 'DATABASE_ERROR',
  FOREIGN_KEY_CONSTRAINT = 'FOREIGN_KEY_CONSTRAINT',
  UNIQUE_CONSTRAINT = 'UNIQUE_CONSTRAINT',

  //Server errors
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
}
