import { PersonRole } from "@prisma/client";
import { Patient } from "@patient/model";
import { AuditLog } from "@auditLog/model";
import { Doctor } from "@doctor/model";

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
