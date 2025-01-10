import { HttpException } from "@common/errors/HttpException";

export class NotFoundException extends HttpException {
  constructor() {
    super("Resource not found", 404);

    Object.setPrototypeOf(this, NotFoundException.prototype);
  }
}
