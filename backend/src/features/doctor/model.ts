import { Person } from "@person/model";
import { Appointment } from "@appointment/model";
import { Department } from "@department/model";

export interface Doctor {
  doctorId: string;
  personId: string;
  departmentId?: string;
  specialization: string;
  room?: string;
  workStart: string;
  workEnd: string;
  appointments: Appointment[];
  director?: Department;
  department?: Department;
  person: Person;
}
