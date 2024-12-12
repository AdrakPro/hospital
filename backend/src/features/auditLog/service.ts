import { PrismaClient } from "@prisma/client";
import prisma from "@db/prisma";
import { CreateAuditLogDTO, ReadAuditLogDTO } from "@auditLog/dto";

export class AuditLogService {
  private db: PrismaClient;

  constructor(db?: PrismaClient) {
    this.db = db || prisma;
  }

  async createAuditLog(
    auditLogDTO: CreateAuditLogDTO,
  ): Promise<ReadAuditLogDTO> {
    return this.db.auditLog.create({
      data: auditLogDTO,
    });
  }

  async getAuditLogById(logId: string): Promise<ReadAuditLogDTO | null> {
    return this.db.auditLog.findUnique({
      where: { logId },
    });
  }

  async deleteAuditLog(logId: string): Promise<void> {
    await this.db.auditLog.delete({
      where: { logId },
    });
  }
}
