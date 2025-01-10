import { HttpException } from "@common/errors/HttpException";

export class UnauthorizedException extends HttpException {
  constructor() {
    super("Unauthorized", 401);

    Object.setPrototypeOf(this, UnauthorizedException.prototype);
  }
}
