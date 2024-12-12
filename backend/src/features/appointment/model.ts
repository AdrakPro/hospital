import { AppointmentStatus, Prescription } from "@prisma/client";
import { Doctor } from "@doctor/model";
import { Patient } from "@patient/model";

export interface Appointment {
  appointmentId: string;
  patientId: string;
  date: Date;
  status: AppointmentStatus;
  doctorId: string;
  doctor: Doctor;
  patient: Patient;
  prescriptions: Prescription[];
}
