export class HttpException extends Error {
  message: string;
  statusCode: number;
  details?: string;
  errors: any;

  constructor(statusCode: number, details?: string, errors?: any) {
    let message;

    switch (statusCode) {
      case ErrorCode.BAD_REQUEST:
        message = "Required fields are missing or invalid.";
        break;
      case ErrorCode.NOT_FOUND:
        message = "Resource not found.";
        break;
      case ErrorCode.CONFLICT:
        message = "Duplicate entry detected. The resource already exists.";
        break;
      case ErrorCode.INTERNAL_SERVER_ERROR:
        message = "An unexpected error occurred on the server.";
        break;
    }

    super(message);
    this.statusCode = statusCode;
    this.errors = errors || null;
    this.details = details;
  }
}

export enum ErrorCode {
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
}
