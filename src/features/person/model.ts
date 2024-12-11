import { Patient } from "@patient/model";
import { PersonRole } from "@prisma/client";

export interface Person {
  personId: string;
  name: string;
  surname: string;
  dateOfBirth: Date;
  phoneNumber: string;
  address: string;
  username: string;
  password: string;
  role: PersonRole | null;
  auditLogs: AuditLog[];
  doctor?: Doctor;
  patient?: Patient;
}
