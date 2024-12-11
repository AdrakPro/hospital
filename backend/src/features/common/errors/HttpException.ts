export class HttpException extends Error {
  message: string;
  statusCode: number;
  errors: any;

  constructor(message: string, statusCode: number, errors?: any) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.errors = errors || null;
  }
}

export enum ErrorCode {
  BAD_REQUEST = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
}
