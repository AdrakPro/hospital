import { ValidationError } from "class-validator";
import { HttpException } from "@common/errors/HttpException";

export class BadRequestException extends HttpException {
  constructor(modelName: string, errors: ValidationError[]) {
    super(
      "Required fields are missing or invalid.",
      400,
      errors.map((e) => ({
        modelName,
        cause: e.toString(false, true, "", true).slice(3, -2),
      })));

    Object.setPrototypeOf(this, BadRequestException.prototype);
  }
}
