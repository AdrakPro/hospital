import express from "express";
import { AppointmentController } from "@appointment/controller";
import { AppointmentService } from "@appointment/service";

const router = express.Router();
const appointmentController = new AppointmentController(
  new AppointmentService(),
);

router.get("/appointment/:appointmentId", appointmentController.getAppointment);
router.post(
  "/appointment/:doctorId/:patientId",
  appointmentController.createAppointment,
);
router.put(
  "/appointment/:appointmentId",
  appointmentController.updateAppointment,
);
router.delete(
  "/appointment/:appointmentId",
  appointmentController.deleteAppointment,
);

export default router;
