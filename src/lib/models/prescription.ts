import type {Appointment} from "$lib/models/appointment.ts";

export interface Prescription {
    prescriptionId: string;
    drugs: string[];
    issue: string; // ISO 8601 format
    expiration: string; // ISO 8601 format
    notes?: string;
    status: PrescriptionStatus;
    appointmentId: string;
    appointment: Appointment;
}

export enum PrescriptionStatus {
    ACTIVE = "ACTIVE",
    ARCHIVED = "ARCHIVED"
}