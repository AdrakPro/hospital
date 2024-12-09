import { v4 as uuid } from "uuid";
import { createPerson } from "@person/factory";
import { Person, PersonRole } from "@person/model";
import { Patient } from "@patient/model";

export const createPatient = (overrides = {}) => {
  const defaultPerson: Person = createPerson({ role: PersonRole.PATIENT });

  const defaultPatient: Patient = {
    patientId: uuid(),
    personId: defaultPerson.personId,
    dateOfAdmission: new Date("1980-01-01"),
    dateOfDischarge: new Date("1980-01-05"),
    policyNumber: "POL123",
    conditions: ["Hearth stroke"],
    notes: "Notes",
    appointments: [],
    person: defaultPerson,
  };

  // Combine the default values with any overrides provided
  return { ...defaultPerson, ...overrides };
};
