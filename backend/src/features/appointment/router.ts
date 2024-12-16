import express, { NextFunction, Request, Response } from "express";
import { AppointmentController } from "@appointment/controller";
import { AppointmentService } from "@appointment/service";

const appointmentRouter = express.Router();
const appointmentController = new AppointmentController(new AppointmentService());

appointmentRouter.get(
  "/appointments/:appointmentId",
  async (req: Request, res: Response, next: NextFunction) => {
    await appointmentController.getAppointment(req, res, next);
  },
);

appointmentRouter.get("/appointments", async (req: Request, res: Response, next: NextFunction) => {
  await appointmentController.getAllAppointments(req, res, next);
});

appointmentRouter.post("/appointments", async (req: Request, res: Response, next: NextFunction) => {
  await appointmentController.createAppointment(req, res, next);
});

appointmentRouter.put("/appointments", async (req: Request, res: Response, next: NextFunction) => {
  await appointmentController.updateAppointment(req, res, next);
});

appointmentRouter.delete(
  "/appointments/:appointmentId",
  async (req: Request, res: Response, next: NextFunction) => {
    await appointmentController.deleteAppointment(req, res, next);
  },
);

export default appointmentRouter;
