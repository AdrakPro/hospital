import express, { NextFunction, Request, Response } from "express";
import { AppointmentController } from "@appointment/controller";
import { AppointmentService } from "@appointment/service";
import { authMiddleware, Role } from "@common/middlewares/authMiddleware";

const appointmentRouter = express.Router();
const appointmentController = new AppointmentController(new AppointmentService());

appointmentRouter.get(
  "/appointments/:appointmentId",
  authMiddleware([Role.DOCTOR, Role.PATIENT]),
  async (req: Request, res: Response, next: NextFunction) => {
    await appointmentController.getAppointment(req, res, next);
  },
);

appointmentRouter.get(
  "/appointments",
  authMiddleware([Role.DOCTOR]),
  async (req: Request, res: Response, next: NextFunction) => {
    await appointmentController.getAllAppointments(req, res, next);
  },
);

appointmentRouter.post(
  "/appointments",
  authMiddleware([Role.PATIENT]),
  async (req: Request, res: Response, next: NextFunction) => {
    await appointmentController.createAppointment(req, res, next);
  },
);

appointmentRouter.put(
  "/appointments/:appointmentId",
  authMiddleware([Role.DOCTOR]),
  async (req: Request, res: Response, next: NextFunction) => {
    await appointmentController.updateAppointment(req, res, next);
  },
);

appointmentRouter.delete(
  "/appointments/:appointmentId",
  authMiddleware([Role.DOCTOR]),
  async (req: Request, res: Response, next: NextFunction) => {
    await appointmentController.deleteAppointment(req, res, next);
  },
);

export default appointmentRouter;
