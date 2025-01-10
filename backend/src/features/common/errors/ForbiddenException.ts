import { HttpException } from "@common/errors/HttpException";

export class ForbiddenException extends HttpException {
  constructor() {
    super("Forbidden", 403);

    Object.setPrototypeOf(this, ForbiddenException.prototype);
  }
}
