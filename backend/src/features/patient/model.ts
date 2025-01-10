import { Person } from "@person/model";
import { Appointment } from "@appointment/model";
import { Department } from "@department/model";

export interface Patient {
  patientId: string;
  personId: string;
  dateOfAdmission: Date;
  dateOfDischarge?: Date;
  policyNumber: string;
  conditions: string[];
  notes?: string;
  departmentId?: string;
  appointments: Appointment[];
  department?: Department;
  person: Person;
}
