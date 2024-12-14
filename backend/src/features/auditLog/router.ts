import express, { NextFunction, Request, Response } from "express";
import { AuditLogController } from "@auditLog/controller";
import { AuditLogService } from "@auditLog/service";

const auditLogRouter = express.Router();
const auditLogController = new AuditLogController(new AuditLogService());

auditLogRouter.get(
  "/persons/:personId/logs",
  async (req: Request, res: Response, next: NextFunction) => {
    await auditLogController.getAllAuditLogs(req, res, next);
  },
);

auditLogRouter.get(
  "/logs/:logId",
  async (req: Request, res: Response, next: NextFunction) => {
    await auditLogController.getAuditLog(req, res, next);
  },
);

auditLogRouter.post(
  "/logs",
  async (req: Request, res: Response, next: NextFunction) => {
    await auditLogController.createAuditLog(req, res, next);
  },
);

auditLogRouter.delete(
  "/persons/:personId/logs",
  async (req: Request, res: Response, next: NextFunction) => {
    await auditLogController.deleteOldLogs(req, res, next);
  },
);

export default auditLogRouter;
