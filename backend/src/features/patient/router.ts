import express, { NextFunction, Request, Response } from "express";
import { PatientController } from "@patient/controller";
import { PatientService } from "@patient/service";
import { authMiddleware, Role } from "@common/middlewares/authMiddleware";

const patientRouter = express.Router();
const patientController = new PatientController(new PatientService());

patientRouter.get(
  "/patients",
  authMiddleware([Role.DIRECTOR]),
  async (req: Request, res: Response, next: NextFunction) => {
    await patientController.getAllPatients(req, res, next);
  },
);

patientRouter.get(
  "/patients/:patientId",
  authMiddleware([Role.DIRECTOR, Role.PATIENT]),
  async (req: Request, res: Response, next: NextFunction) => {
    await patientController.getPatientById(req, res, next);
  },
);

patientRouter.post(
  "/patients",
  authMiddleware([]),
  async (req: Request, res: Response, next: NextFunction) => {
    await patientController.createPatient(req, res, next);
  },
);

patientRouter.put(
  "/patients",
  authMiddleware([Role.DIRECTOR, Role.PATIENT]),
  async (req: Request, res: Response, next: NextFunction) => {
    await patientController.updatePatient(req, res, next);
  },
);

patientRouter.delete(
  "/patients/:patientId",
  authMiddleware([]),
  async (req: Request, res: Response, next: NextFunction) => {
    await patientController.deletePatient(req, res, next);
  },
);

export default patientRouter;
