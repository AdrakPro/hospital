import { PrescriptionStatus } from "@prisma/client";
import { Appointment } from "@appointment/model";

interface Prescription {
  prescriptionId: string;
  drugs: string[];
  issue: Date;
  expiration: Date;
  notes?: string;
  status: PrescriptionStatus;
  appointmentId: string;
  appointment: Appointment;
}
