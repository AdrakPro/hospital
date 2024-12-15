import express from "express";
import personRouter from "@person/router";
import prescriptionRouter from "@prescription/router";
import doctorRouter from "@doctor/router";
import patientRouter from "@patient/router";
import auditLogRouter from "@auditLog/router";
import departmentRouter from "@department/router";

const mainRouter = express.Router();

mainRouter.use("/api",
  personRouter,
  prescriptionRouter,
  doctorRouter,
  patientRouter,
  auditLogRouter,
  departmentRouter,
);

export default mainRouter;
