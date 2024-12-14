import { AuditAction } from "@prisma/client";
import { Person } from "@person/model";

export interface AuditLog {
  logId: string;
  personId: string;
  createdAt: Date;
  action: AuditAction;
  log: string;
  person: Person;
}
