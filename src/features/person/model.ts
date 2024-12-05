interface Person {
  personId: string;
  name: string;
  surname: string;
  dateOfBirth: Date;
  phoneNumber: string;
  address: string;
  username: string;
  passwordHash: string;
  role: PersonRole | null;
  auditLogs: AuditLog[];
  doctor?: Doctor;
  patient?: Patient;
}

enum PersonRole {
  PATIENT,
  DOCTOR,
  DIRECTOR,
}
