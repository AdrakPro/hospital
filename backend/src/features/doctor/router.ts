import express, { NextFunction, Request, Response } from "express";
import { DoctorController } from "@doctor/controller";
import { DoctorService } from "@doctor/service";

const doctorRouter = express.Router();
const doctorController = new DoctorController(new DoctorService());

doctorRouter.get(
  "/doctors",
  async (req: Request, res: Response, next: NextFunction) => {
    await doctorController.getAllDoctors(req, res, next);
  },
);

doctorRouter.get(
  "/doctors/:doctorId",
  async (req: Request, res: Response, next: NextFunction) => {
    await doctorController.getDoctorById(req, res, next);
  },
);

doctorRouter.post(
  "/doctors",
  async (req: Request, res: Response, next: NextFunction) => {
    await doctorController.createDoctor(req, res, next);
  },
);

doctorRouter.put(
  "/doctors",
  async (req: Request, res: Response, next: NextFunction) => {
    await doctorController.updateDoctor(req, res, next);
  },
);

doctorRouter.delete(
  "/doctors/:doctorId",
  async (req: Request, res: Response, next: NextFunction) => {
    await doctorController.deleteDoctor(req, res, next);
  },
);

export default doctorRouter;
