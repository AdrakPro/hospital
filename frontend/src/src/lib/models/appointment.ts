import type {Doctor} from "$lib/models/doctor.ts";
import type {Patient} from "$lib/models/patient.ts";
import type {Prescription} from "$lib/models/prescription.ts";

export interface Appointment {
    appointmentId: string;
    patientId: string;
    date: string; // ISO 8601 format
    status: AppointmentStatus;
    doctorId: string;
    doctor: Doctor;
    patient: Patient;
    prescriptions: Prescription[];
}

export enum AppointmentStatus {
    SCHEDULED = "SCHEDULED",
    CANCELED = "CANCELED",
    COMPLETED = "COMPLETED",
    NO_SHOW = "NO_SHOW"
}