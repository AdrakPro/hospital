import express, { NextFunction, Request, Response } from "express";
import personRouter from "@person/router";
import prescriptionRouter from "@prescription/router";
import doctorRouter from "@doctor/router";
import patientRouter from "@patient/router";
import auditLogRouter from "@auditLog/router";
import departmentRouter from "@department/router";
import appointmentRouter from "@appointment/router";
import authMiddleware from "@common/middlewares/authMiddleware";
import AuthService from "@common/auth/service";

const auth = new authMiddleware(new AuthService());

const mainRouter = express.Router();

mainRouter.use("/api", async (req: Request, res: Response, next: NextFunction) => {
  await auth.authorize(req, res, next);
});

mainRouter.use(
  "/api",
  personRouter,
  prescriptionRouter,
  doctorRouter,
  patientRouter,
  auditLogRouter,
  departmentRouter,
  appointmentRouter,
);

export default mainRouter;
