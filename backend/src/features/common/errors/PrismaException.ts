import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { PrismaErrorCodeMap } from "@common/constants/prismaErrors";
import { HttpException } from "@common/errors/HttpException";

export class PrismaException extends HttpException {
  constructor(error: any) {
    if (error instanceof PrismaClientKnownRequestError) {
      const mappedError = PrismaErrorCodeMap[error.code];

      if (mappedError) {
        const { statusCode, message } = mappedError;
        super(message, statusCode, error.meta);
      } else {
        super("An unexpected database error occurred.", 500);
      }
    } else {
      super("Unexpected error", 500, error);
    }

    Object.setPrototypeOf(this, PrismaException.prototype);
  }
}
