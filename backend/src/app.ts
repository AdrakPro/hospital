import express from "express";
import * as process from "node:process";
import { errorMiddleware } from "@common/middlewares/errorMiddleware";
import personRouter from "@person/router";
import prescriptionRouter from "@prescription/router";
import doctorRouter from "@doctor/router";
import patientRouter from "@patient/router";
import auditLogRouter from "@auditLog/router";

const app = express();

app.use(express.json({ limit: "5kb" }));

app.use("/api",
  personRouter,
  prescriptionRouter,
  doctorRouter,
  patientRouter,
  auditLogRouter,
);

app.use(errorMiddleware);

app.use((req, res, next) => {
  res.status(404).json({
    status: "error",
    statusCode: 404,
    message: `Cannot ${req.method} ${req.originalUrl}`,
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
