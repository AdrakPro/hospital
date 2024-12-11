import { validate, ValidationError } from "class-validator";

export async function validateDTO<T extends object>(
  dto: T,
): Promise<ValidationError[]> {
  const errors = await validate(dto);

  if (errors.length > 0) {
    console.error("Validation errors:", errors);
  }

  return errors;
}

export function hasUndefinedField(obj: Record<string, any>) {
  return Object.values(obj).every((v) => v === undefined);
}
