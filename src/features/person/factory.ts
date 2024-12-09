import { CreatePersonDTO } from "@person/dto";

export function createPersonDTO(
  overrides?: Partial<CreatePersonDTO>,
): CreatePersonDTO {
  const person = new CreatePersonDTO();

  person.name = overrides?.name ?? "John";
  person.surname = overrides?.surname ?? "Doe";
  person.dateOfBirth = overrides?.dateOfBirth ?? "1980-01-01";
  person.phoneNumber = overrides?.phoneNumber ?? "+48793921111";
  person.address = overrides?.address ?? "123 Elm Street";
  person.username = overrides?.username ?? "john_doe";
  person.role = overrides?.role ?? undefined;

  return person;
}
