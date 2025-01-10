import { CreatePersonDTO } from "@person/dto";

export function createPersonFactory(
  overrides?: Partial<CreatePersonDTO>,
): CreatePersonDTO {
  const person = new CreatePersonDTO();

  person.name = overrides?.name ?? "John";
  person.surname = overrides?.surname ?? "Doe";
  person.dateOfBirth = overrides?.dateOfBirth ?? new Date("1980-01-01");
  person.phoneNumber = overrides?.phoneNumber ?? "48730687655";
  person.address = overrides?.address ?? "123 Elm Street";
  person.username = overrides?.username ?? "john_doe";
  person.password = overrides?.password ?? "john_doe";
  person.role = overrides?.role ?? null;

  return person;
}
