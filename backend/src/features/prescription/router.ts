import { NextFunction, Request, Response, Router } from "express";
import { PrescriptionController } from "@prescription/controller";
import { PrescriptionService } from "@prescription/service";

const prescriptionRouter = Router();
const prescriptionController = new PrescriptionController(new PrescriptionService());

prescriptionRouter.get(
  "/prescriptions/:prescriptionId",
  async (req: Request, res: Response, next: NextFunction) => {
    await prescriptionController.getPrescription(req, res, next);
  },
);

prescriptionRouter.get(
  "/patients/:patientId/prescriptions",
  async (req: Request, res: Response, next: NextFunction) => {
    await prescriptionController.getAllPatientsPrescriptions(req, res, next);
  },
);

prescriptionRouter.post(
  "/prescriptions",
  async (req: Request, res: Response, next: NextFunction) => {
    await prescriptionController.createPrescription(req, res, next);
  },
);

prescriptionRouter.put(
  "/prescriptions",
  async (req: Request, res: Response, next: NextFunction) => {
    await prescriptionController.updatePrescription(req, res, next);
  },
);

prescriptionRouter.delete(
  "/prescriptions/:prescriptionId",
  async (req: Request, res: Response, next: NextFunction) => {
    await prescriptionController.deletePrescription(req, res, next);
  },
);

export default prescriptionRouter;
