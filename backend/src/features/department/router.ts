import express, { NextFunction, Request, Response } from "express";
import { DepartmentController } from "@department/controller";
import { DepartmentService } from "@department/service";

const departmentRouter = express.Router();
const departmentController = new DepartmentController(new DepartmentService());

departmentRouter.get("/departments", async (req: Request, res: Response, next: NextFunction) => {
  await departmentController.getAllDepartments(req, res, next);
});

departmentRouter.get(
  "/departments/:departmentId",
  async (req: Request, res: Response, next: NextFunction) => {
    await departmentController.getDepartment(req, res, next);
  },
);

departmentRouter.post("/departments", async (req: Request, res: Response, next: NextFunction) => {
  await departmentController.createDepartment(req, res, next);
});

departmentRouter.put("/departments", async (req: Request, res: Response, next: NextFunction) => {
  await departmentController.updateDepartment(req, res, next);
});

departmentRouter.delete(
  "/departments/:departmentId",
  async (req: Request, res: Response, next: NextFunction) => {
    await departmentController.deleteDepartment(req, res, next);
  },
);

departmentRouter.put(
  "/departments/director",
  async (req: Request, res: Response, next: NextFunction) => {
    await departmentController.assignDirector(req, res, next);
  },
);

departmentRouter.post(
  "/departments/patientr",
  async (req: Request, res: Response, next: NextFunction) => {
    await departmentController.assignPatient(req, res, next);
  },
);
departmentRouter.post(
  "/departments/doctors",
  async (req: Request, res: Response, next: NextFunction) => {
    await departmentController.assignDoctor(req, res, next);
  },
);

departmentRouter.delete(
  "/departments/:departmentId/doctor/:doctorId",
  async (req: Request, res: Response, next: NextFunction) => {
    await departmentController.unassignDoctor(req, res, next);
  },
);

departmentRouter.delete(
  "/departments/:departmentId/patient/:patientId",
  async (req: Request, res: Response, next: NextFunction) => {
    await departmentController.unassignPatient(req, res, next);
  },
);

export default departmentRouter;
