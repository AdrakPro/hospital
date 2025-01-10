import { HttpException } from "@common/errors/HttpException";

export class AuthException extends HttpException {
  constructor(message: string) {
    super(message, 401);

    Object.setPrototypeOf(this, AuthException.prototype);
  }
}
