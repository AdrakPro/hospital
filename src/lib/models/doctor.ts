import type {Person} from "$lib/models/person.ts";
import type {Department} from "$lib/models/department.ts";
import type {Appointment} from "$lib/models/appointment.ts";


export interface Doctor {
    doctorId: string;
    personId: string;
    departmentId?: string;
    specialization: string;
    room?: string;
    workStart: string; // HH:mm format
    workEnd: string; // HH:mm format
    appointments: Appointment[];
    director?: Department;
    department?: Department;
    person: Person;
}