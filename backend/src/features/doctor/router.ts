import express, { NextFunction, Request, Response } from "express";
import { DoctorController } from "@doctor/controller";
import { DoctorService } from "@doctor/service";
import { authMiddleware, Role } from "@common/middlewares/authMiddleware";

const doctorRouter = express.Router();
const doctorController = new DoctorController(new DoctorService());

doctorRouter.get(
  "/doctors",
  authMiddleware([]),
  async (req: Request, res: Response, next: NextFunction) => {
    await doctorController.getAllDoctors(req, res, next);
  },
);

doctorRouter.get(
  "/doctors/:doctorId",
  authMiddleware([Role.DIRECTOR]),
  async (req: Request, res: Response, next: NextFunction) => {
    await doctorController.getDoctorById(req, res, next);
  },
);

doctorRouter.post(
  "/doctors",
  authMiddleware([]),
  async (req: Request, res: Response, next: NextFunction) => {
    await doctorController.createDoctor(req, res, next);
  },
);

doctorRouter.put(
  "/doctors",
  authMiddleware([Role.DIRECTOR]),
  async (req: Request, res: Response, next: NextFunction) => {
    await doctorController.updateDoctor(req, res, next);
  },
);

doctorRouter.delete(
  "/doctors/:doctorId",
  authMiddleware([Role.DIRECTOR]),
  async (req: Request, res: Response, next: NextFunction) => {
    await doctorController.deleteDoctor(req, res, next);
  },
);

export default doctorRouter;
