import type {AuditLog} from "$lib/models/auditlog";
import type {Doctor} from "$lib/models/doctor";
import type {Patient} from "$lib/models/patient";

export interface Person {
    personId: string;
    name: string;
    surname: string;
    dateOfBirth: string; // ISO 8601 format
    phoneNumber: string; // E.164 format
    address: string;
    username: string;
    password: string; // Hashed password
    role?: PersonRole;
    auditLogs: AuditLog[];
    doctor?: Doctor;
    patient?: Patient;
}
export enum PersonRole {
    PATIENT = "PATIENT",
    DOCTOR = "DOCTOR",
    DIRECTOR = "DIRECTOR",
    ADMIN = "ADMIN"
}