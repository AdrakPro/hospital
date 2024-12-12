import { AuditAction } from "@prisma/client";
import { Person } from "@person/model";

export interface AuditLog {
  logId: string;
  userId: string;
  timestamp: Date;
  action: AuditAction;
  log: string;
  person: Person;
}
