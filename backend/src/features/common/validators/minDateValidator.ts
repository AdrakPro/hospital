import { buildMessage, ValidateBy, ValidationOptions } from "class-validator";

export const MIN_DATE = "minDate";

function minDate(date: unknown, minDate: Date): boolean {
  let dateObject: Date;

  if (typeof date === "string") {
    dateObject = new Date(date);
  } else if (date instanceof Date) {
    dateObject = date;
  } else {
    return false;
  }

  if (isNaN(dateObject.getTime())) {
    return false;
  }

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
          (eachPrefix) => "Minimal allowed date for " + eachPrefix + "$property is $constraint1",
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
}
