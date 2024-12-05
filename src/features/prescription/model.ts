interface Prescription {
  prescriptionId: string;
  drugs: string;
  issue: Date;
  expiration: Date;
  notes?: string;
  appointmentId: string;
  appointment: Appointment;
}
