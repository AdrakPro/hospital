interface Doctor {
  doctorId: string;
  personId: string;
  departmentId?: string;
  specialization: string;
  room?: string;
  workStart: Date;
  workEnd: Date;
  appointments: Appointment[];
  director?: Department;
  department?: Department;
  person: Person;
}
