import express, { NextFunction, Request, Response } from "express";
import { DoctorController } from "@doctor/controller";
import { DoctorService } from "@doctor/service";

const doctorRouter = express.Router();
const doctorController = new DoctorController(new DoctorService());

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

// w PUT musimy podac cale entity i jezeli raz sie wykona to kolejny rz juz nie, w patch caly czas zmieniamy poszczegolne pola
doctorRouter.put(
  "/doctor/:doctorId",
  async (req: Request, res: Response, next: NextFunction) => {
    await doctorController.updateDoctor(req, res, next);
  },
);
// kaskadowe?
doctorRouter.delete(
  "/doctor/:doctorId",
  async (req: Request, res: Response, next: NextFunction) => {
    await doctorController.deleteDoctor(req, res, next);
  },
);

export default doctorRouter;
