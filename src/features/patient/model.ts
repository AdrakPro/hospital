interface Patient {
  patientId: string;
  personId: string;
  dateOfAdmission: Date;
  dateOfDischarge?: Date;
  policyNumber: string;
  conditions: string[];
  notes?: string;
  departmentId?: string;
  appointments: Appointment[];
  department?: Department;
  person: Person;
}
