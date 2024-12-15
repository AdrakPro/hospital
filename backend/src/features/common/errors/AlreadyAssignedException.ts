import { HttpException } from "@common/errors/HttpException";

export class AlreadyAssignedException extends HttpException {
  constructor(isPatient: boolean) {
    const person = isPatient ? "Patient" : "Doctor";

    super(
      `${person} is already assigned in department.`,
      400,
    );

    Object.setPrototypeOf(this, AlreadyAssignedException.prototype);
  }
}
