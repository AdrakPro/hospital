import type {Person} from "$lib/models/person.ts";
import type {Appointment} from "$lib/models/appointment.ts";
import type {Department} from "$lib/models/department.ts";

export interface Patient {
    patientId: string;
    personId: string;
    dateOfAdmission: string; // ISO 8601 format
    dateOfDischarge?: string; // ISO 8601 format
    policyNumber: string;
    conditions: string[];
    notes?: string;
    departmentId?: string;
    appointments: Appointment[];
    department?: Department;
    person: Person;
}