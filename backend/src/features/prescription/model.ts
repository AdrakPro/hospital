import { PrescriptionStatus } from "@prisma/client";

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
