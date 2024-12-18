import { NextFunction, Request, Response, Router } from "express";
import { PrescriptionController } from "@prescription/controller";
import { PrescriptionService } from "@prescription/service";
import { authMiddleware, Role } from "@common/middlewares/authMiddleware";

const prescriptionRouter = Router();
const prescriptionController = new PrescriptionController(new PrescriptionService());

prescriptionRouter.get(
  "/prescriptions/:prescriptionId",
  authMiddleware([Role.DOCTOR, Role.PATIENT]),
  async (req: Request, res: Response, next: NextFunction) => {
    await prescriptionController.getPrescription(req, res, next);
  },
);

prescriptionRouter.get(
  "/patients/:patientId/prescriptions",
  authMiddleware([Role.DOCTOR, Role.PATIENT]),
  async (req: Request, res: Response, next: NextFunction) => {
    await prescriptionController.getAllPatientsPrescriptions(req, res, next);
  },
);

prescriptionRouter.post(
  "/prescriptions",
  authMiddleware([Role.DOCTOR]),
  async (req: Request, res: Response, next: NextFunction) => {
    await prescriptionController.createPrescription(req, res, next);
  },
);

prescriptionRouter.put(
  "/prescriptions",
  authMiddleware([Role.DOCTOR]),
  async (req: Request, res: Response, next: NextFunction) => {
    await prescriptionController.updatePrescription(req, res, next);
  },
);

prescriptionRouter.delete(
  "/prescriptions/:prescriptionId",
  authMiddleware([]),
  async (req: Request, res: Response, next: NextFunction) => {
    await prescriptionController.deletePrescription(req, res, next);
  },
);

export default prescriptionRouter;
