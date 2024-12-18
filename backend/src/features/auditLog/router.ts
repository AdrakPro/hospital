import express, { NextFunction, Request, Response } from "express";
import { AuditLogController } from "@auditLog/controller";
import { AuditLogService } from "@auditLog/service";
import { authMiddleware, Role } from "@common/middlewares/authMiddleware";

const auditLogRouter = express.Router();
const auditLogController = new AuditLogController(new AuditLogService());

auditLogRouter.get(
  "/logs",
  authMiddleware([]),
  async (req: Request, res: Response, next: NextFunction) => {
    await auditLogController.getAllAuditLogs(req, res, next);
  },
);

auditLogRouter.get(
  "/persons/:personId/logs",
  authMiddleware([Role.PATIENT, Role.DOCTOR]),
  async (req: Request, res: Response, next: NextFunction) => {
    await auditLogController.getAllPersonAuditLogs(req, res, next);
  },
);

auditLogRouter.get(
  "/logs/:logId",
  authMiddleware([]),
  async (req: Request, res: Response, next: NextFunction) => {
    await auditLogController.getAuditLog(req, res, next);
  },
);

auditLogRouter.post(
  "/logs",
  authMiddleware([]),
  async (req: Request, res: Response, next: NextFunction) => {
    await auditLogController.createAuditLog(req, res, next);
  },
);

auditLogRouter.delete(
  "/persons/:personId/logs",
  authMiddleware([]),
  async (req: Request, res: Response, next: NextFunction) => {
    await auditLogController.deleteOldLogs(req, res, next);
  },
);

export default auditLogRouter;
