import type {Doctor} from "$lib/models/doctor.ts";
import type {Patient} from "$lib/models/patient.ts";


export interface Department {
    departmentId: string;
    name: string;
    bedCount: number;
    patientCount: number;
    doctorCount: number;
    directorId: string;
    director: Doctor;
    doctors: Doctor[];
    patients: Patient[];
}