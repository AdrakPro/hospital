import { registerDecorator, ValidationArguments, ValidationOptions } from "class-validator";

export function IsNonNumericString(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "isNonNumericString",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return typeof value === "string" && !/^\d+$/.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a non-numeric string`;
        },
      },
    });
  };
}
