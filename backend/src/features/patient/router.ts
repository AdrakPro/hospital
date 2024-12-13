import express, { NextFunction, Request, Response } from "express";
import { PatientController } from "@patient/controller";
import { PatientService } from "@patient/service";

const patientRouter = express.Router();
const patientController = new PatientController(new PatientService());

patientRouter.get(
  "/patients",
  async (req: Request, res: Response, next: NextFunction) => {
    await patientController.getAllPatients(req, res, next);
  },
);

patientRouter.get(
  "/patients/:patientId",
  async (req: Request, res: Response, next: NextFunction) => {
    await patientController.getPatientById(req, res, next);
  },
);

patientRouter.post(
  "/patients",
  async (req: Request, res: Response, next: NextFunction) => {
    await patientController.createPatient(req, res, next);
  },
);

patientRouter.put(
  "/patients",
  async (req: Request, res: Response, next: NextFunction) => {
    await patientController.updatePatient(req, res, next);
  },
);

patientRouter.delete(
  "/patients/:patientId",
  async (req: Request, res: Response, next: NextFunction) => {
    await patientController.deletePatient(req, res, next);
  },
);

export default patientRouter;
