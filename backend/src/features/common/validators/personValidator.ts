import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ async: false })
export class IsValidPersonConstraint implements ValidatorConstraintInterface {
  validate(person: any, args: ValidationArguments): boolean {
    if (typeof person !== "object" || person === null) {
      return false;
    }

    const { name, surname, dateOfBirth, phoneNumber, password, address, username } = person;

    return (
      typeof name === "string" &&
      name.trim().length > 0 &&
      typeof surname === "string" &&
      surname.trim().length > 0 &&
      typeof dateOfBirth === "string" &&
      !isNaN(Date.parse(dateOfBirth)) &&
      typeof phoneNumber === "string" &&
      /^\d{11}$/.test(phoneNumber) &&
      typeof password === "string" &&
      password.length >= 8 &&
      password.length <= 32 &&
      typeof address === "string" &&
      address.trim().length > 0 &&
      typeof username === "string" &&
      username.trim().length > 0 &&
      username.length <= 25
    );
  }

  defaultMessage(args: ValidationArguments): string {
    return "one or more fields are missing or incorrect.";
  }
}

export function IsValidPerson(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidPersonConstraint,
    });
  };
}
