import { buildMessage, ValidateBy, ValidationOptions } from "class-validator";

export const MIN_DATE = "minDate";

function minDate(date: unknown, minDate: Date): boolean {
  const dateObject: Date = typeof date === "string" ? new Date(date) : <Date>date;
  return dateObject.getTime() >= minDate.getTime();
}

export function MinDate(date: Date, validationOptions?: ValidationOptions): PropertyDecorator {
  return ValidateBy(
    {
      name: MIN_DATE,
      constraints: [date],
      validator: {
        validate: (value, args): boolean => minDate(value, args?.constraints[0]),
        defaultMessage: buildMessage(
          (eachPrefix) => "minimal allowed date for " + eachPrefix + "$property is $constraint1",
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
}
