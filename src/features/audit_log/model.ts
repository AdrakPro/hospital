interface AuditLog {
  logId: string;
  userId: string;
  timestamp: Date;
  action: AuditAction;
  log: string;
  person: Person;
}

enum AuditAction {
  INSERT,
  UPDATE,
  DELETE,
  GET,
}
