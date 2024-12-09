import { v4 as uuid } from "uuid";

export const createPerson = (overrides = {}) => {
  const defaultPerson = {
    personId: uuid(),
    name: "John",
    surname: "Doe",
    dateOfBirth: new Date("1980-01-01"),
    phoneNumber: "12345678901",
    address: "123 Elm Street",
    username: "john_doe",
    passwordHash: "securepassword",
    role: null,
    auditLogs: [],
    doctor: undefined,
    patient: undefined,
  };

  // Combine the default values with any overrides provided
  return { ...defaultPerson, ...overrides };
};
