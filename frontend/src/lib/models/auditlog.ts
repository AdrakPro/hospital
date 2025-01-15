import type {Person} from "$lib/models/person.ts";

export interface AuditLog {
    logId: string;
    personId: string;
    createdAt: string; // ISO 8601 format
    action: AuditAction;
    model: string;
    log: string;
    person: Person;
}

export enum AuditAction {
    CREATE = "CREATE",
    UPDATE = "UPDATE",
    DELETE = "DELETE",
    GET = "GET"
}