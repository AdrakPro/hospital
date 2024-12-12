import { NextFunction, Request, Response } from "express";
import { AuditLogService } from "@auditLog/service";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { CreateAuditLogDTO, DeleteAuditLogDTO } from "@auditLog/dto";
import { ErrorCode, HttpException } from "@common/errors/httpException";
import {
  sendSuccessResponse,
  SuccessCode,
} from "@common/utils/sendSuccessResponse";

export class AuditLogController {
  private auditLogService: AuditLogService;

  constructor(auditLogService: AuditLogService) {
    this.auditLogService = auditLogService;
  }

  async createAuditLog(req: Request, res: Response, next: NextFunction) {
    const auditLogDTO = plainToInstance(CreateAuditLogDTO, req.body);
    const errors = await validate(auditLogDTO);

    if (errors.length > 0) {
      return next(new HttpException(ErrorCode.BAD_REQUEST, undefined, errors));
    }

    try {
      const auditLog = await this.auditLogService.createAuditLog(auditLogDTO);
      await sendSuccessResponse(res, SuccessCode.CREATED, { auditLog });
    } catch (e: any) {
      next(new HttpException(ErrorCode.INTERNAL_SERVER_ERROR, e.message));
    }
  }

  async getAuditLog(req: Request, res: Response, next: NextFunction) {
    const { logId } = req.params;

    try {
      const auditLog = await this.auditLogService.getAuditLogById(logId);

      if (!auditLog) {
        return next(new HttpException(ErrorCode.NOT_FOUND));
      }

      await sendSuccessResponse(res, SuccessCode.OK, { auditLog });
    } catch (e: any) {
      next(new HttpException(ErrorCode.INTERNAL_SERVER_ERROR, e.message));
    }
  }

  async deleteAuditLog(req: Request, res: Response, next: NextFunction) {
    const { logId } = req.params;
    const deleteAuditLogDTO = plainToInstance(DeleteAuditLogDTO, { logId });
    const errors = await validate(deleteAuditLogDTO);

    if (errors.length > 0) {
      return next(new HttpException(ErrorCode.BAD_REQUEST, undefined, errors));
    }

    try {
      await this.auditLogService.deleteAuditLog(logId);
      await sendSuccessResponse(res, SuccessCode.NO_CONTENT);
    } catch (e: any) {
      next(new HttpException(ErrorCode.INTERNAL_SERVER_ERROR, e.message));
    }
  }
}
