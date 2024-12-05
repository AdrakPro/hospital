interface Appointment {
  appointmentId: string;
  patientId: string;
  date: Date;
  status: AppointmentStatus;
  doctorId: string;
  doctor: Doctor;
  patient: Patient;
  prescriptions: Prescription[];
}

enum AppointmentStatus {
  SCHEDULED,
  CANCELED,
  COMPLETED,
  NO_SHOW,
}
