import { Doctor } from "@doctor/model";
import { Patient } from "@patient/model";

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
