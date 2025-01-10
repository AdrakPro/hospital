import { NextFunction, Request, Response } from "express";
import { AuditLogService } from "@auditLog/service";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { CreateAuditLogDTO, DeleteAuditLogDTO } from "@auditLog/dto";
import { PrismaException } from "@common/errors/PrismaException";
import { sendSuccessResponse, SuccessCode } from "@common/utils/sendSuccessResponse";
import { BadRequestException } from "@common/errors/BadRequestException";
import { AUDIT_LOG_MODEL } from "@common/constants/modelName";
import { NotFoundException } from "@common/errors/NotFoundException";

export class AuditLogController {
  private auditLogService: AuditLogService;

  constructor(auditLogService: AuditLogService) {
    this.auditLogService = auditLogService;
  }

  async createAuditLog(req: Request, res: Response, next: NextFunction) {
    const auditLogDTO = plainToInstance(CreateAuditLogDTO, req.body);
    const errors = await validate(auditLogDTO);

    if (errors.length > 0) {
      return next(new BadRequestException(AUDIT_LOG_MODEL, errors));
    }

    try {
      const auditLog = await this.auditLogService.createAuditLog(auditLogDTO);
      await sendSuccessResponse(res, SuccessCode.CREATED, { auditLog });
    } catch (e: any) {
      next(new PrismaException(e));
    }
  }

  async getAllPersonAuditLogs(req: Request, res: Response, next: NextFunction) {
    const { personId } = req.params;

    try {
      const auditLogs = await this.auditLogService.getAllPersonAuditLogs(personId);

      if (auditLogs.length === 0) {
        return next(new NotFoundException());
      }

      await sendSuccessResponse(res, SuccessCode.OK, { auditLogs });
    } catch (e: any) {
      next(new PrismaException(e));
    }
  }

  async getAuditLog(req: Request, res: Response, next: NextFunction) {
    const { logId } = req.params;

    try {
      const auditLog = await this.auditLogService.getAuditLogById(logId);

      if (!auditLog) {
        return next(new NotFoundException());
      }

      await sendSuccessResponse(res, SuccessCode.OK, { auditLog });
    } catch (e: any) {
      next(new PrismaException(e));
    }
  }

  async deleteOldLogs(req: Request, res: Response, next: NextFunction) {
    const LOGS_TO_DELETE = 20;
    const { personId } = req.params;
    const deleteAuditLogDTO = plainToInstance(DeleteAuditLogDTO, { personId });
    const errors = await validate(deleteAuditLogDTO);

    if (errors.length > 0) {
      return next(new BadRequestException(AUDIT_LOG_MODEL, errors));
    }

    try {
      await this.auditLogService.deleteManyAuditLogs(personId, LOGS_TO_DELETE);
      await sendSuccessResponse(res, SuccessCode.NO_CONTENT);
    } catch (e: any) {
      next(new PrismaException(e));
    }
  }

  async getAllAuditLogs(req: Request, res: Response, next: NextFunction) {
    try {
      const auditLogs = await this.auditLogService.getAllAuditLogs();

      if (auditLogs.length === 0) {
        return next(new NotFoundException());
      }

      await sendSuccessResponse(res, SuccessCode.OK, { auditLogs });
    } catch (e: any) {
      next(new PrismaException(e));
    }
  }
}
