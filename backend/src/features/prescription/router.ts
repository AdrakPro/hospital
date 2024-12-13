import { NextFunction, Request, Response, Router } from "express";
import { PrescriptionController } from "@prescription/controller";
import { PrescriptionService } from "@prescription/service";

const prescriptionRouter = Router();
const prescriptionController = new PrescriptionController(
  new PrescriptionService(),
);

prescriptionRouter.post(
  "/appointment/:appointmentId/prescription",
  async (req: Request, res: Response, next: NextFunction) => {
    await prescriptionController.createPrescription(req, res, next);
  },
);

prescriptionRouter.get(
  "/prescription/:prescriptionId",
  async (req: Request, res: Response, next: NextFunction) => {
    await prescriptionController.getPrescription(req, res, next);
  },
);

prescriptionRouter.patch(
  "/prescription/:prescriptionId",
  async (req: Request, res: Response, next: NextFunction) => {
    await prescriptionController.patchPrescription(req, res, next);
  },
);

prescriptionRouter.delete(
  "/prescription/:prescriptionId",
  async (req: Request, res: Response, next: NextFunction) => {
    await prescriptionController.deletePrescription(req, res, next);
  },
);

export default prescriptionRouter;
