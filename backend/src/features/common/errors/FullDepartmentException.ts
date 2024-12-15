import { HttpException } from "@common/errors/HttpException";

export class FullDepartmentException extends HttpException {
  constructor() {
    super("Department is full, cannot assign more patients.", 422);

    Object.setPrototypeOf(this, FullDepartmentException.prototype);
  }
}
