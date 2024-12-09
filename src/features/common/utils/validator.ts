import { validate } from "class-validator";
import { ValidationError } from "class-validator";

export async function validateDto<T extends object>(
  dto: T,
): Promise<ValidationError[]> {
  const errors = await validate(dto);

  if (errors.length > 0) {
    console.error("Validation errors:", errors);
  }

  return errors;
}
