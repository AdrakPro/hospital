import { PrismaClient } from "@prisma/client";
import prisma from "@db/prisma";
import { CreateAuditLogDTO, ReadAuditLogDTO } from "@auditLog/dto";

export class AuditLogService {
  private db: PrismaClient;

  constructor(db?: PrismaClient) {
    this.db = db || prisma;
  }

  async createAuditLog(auditLogDTO: CreateAuditLogDTO): Promise<ReadAuditLogDTO> {
    return this.db.auditLog.create({
      data: auditLogDTO,
    });
  }

  async getAuditLogById(logId: string): Promise<ReadAuditLogDTO | null> {
    return this.db.auditLog.findUnique({
      where: { logId },
    });
  }

  async getAllAuditLogs(): Promise<ReadAuditLogDTO[]> {
    return this.db.auditLog.findMany();
  }

  async getAllPersonAuditLogs(personId: string): Promise<ReadAuditLogDTO[]> {
    return this.db.auditLog.findMany({
      where: { personId },
    });
  }

  async deleteManyAuditLogs(personId: string, LOGS_TO_DELETE: number): Promise<void> {
    const logs = await this.db.auditLog.findMany({
      where: { personId },
      take: LOGS_TO_DELETE,
      orderBy: {
        createdAt: "asc",
      },
    });

    const ids = logs.map((log) => log.logId);

    await this.db.auditLog.deleteMany({
      where: {
        logId: {
          in: ids,
        },
      },
    });
  }
}
