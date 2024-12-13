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
  "/doctor/:doctorId",
  async (req: Request, res: Response, next: NextFunction) => {
    await doctorController.getDoctorById(req, res, next);
  },
);

doctorRouter.post(
  "/doctor/:personId",
  async (req: Request, res: Response, next: NextFunction) => {
    await doctorController.createDoctor(req, res, next);
  },
);

doctorRouter.put(
  "/doctor/:doctorId",
  async (req: Request, res: Response, next: NextFunction) => {
    await doctorController.updateDoctor(req, res, next);
  },
);

doctorRouter.delete(
  "/doctor/:doctorId",
  async (req: Request, res: Response, next: NextFunction) => {
    await doctorController.deleteDoctor(req, res, next);
  },
);

export default doctorRouter;
