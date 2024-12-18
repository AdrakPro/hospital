import express, { NextFunction, Request, Response } from "express";
import { DepartmentController } from "@department/controller";
import { DepartmentService } from "@department/service";
import { authMiddleware, Role } from "@common/middlewares/authMiddleware";

const departmentRouter = express.Router();
const departmentController = new DepartmentController(new DepartmentService());

departmentRouter.get(
  "/departments",
  authMiddleware([Role.ADMIN]),
  async (req: Request, res: Response, next: NextFunction) => {
    await departmentController.getAllDepartments(req, res, next);
  },
);

departmentRouter.get(
  "/departments/:departmentId",
  authMiddleware([Role.DIRECTOR]),
  async (req: Request, res: Response, next: NextFunction) => {
    await departmentController.getDepartment(req, res, next);
  },
);

departmentRouter.post(
  "/departments",
  authMiddleware([]),
  async (req: Request, res: Response, next: NextFunction) => {
    await departmentController.createDepartment(req, res, next);
  },
);

departmentRouter.put(
  "/departments",
  authMiddleware([Role.DIRECTOR]),
  async (req: Request, res: Response, next: NextFunction) => {
    await departmentController.updateDepartment(req, res, next);
  },
);

departmentRouter.delete(
  "/departments/:departmentId",
  authMiddleware([]),
  async (req: Request, res: Response, next: NextFunction) => {
    await departmentController.deleteDepartment(req, res, next);
  },
);

departmentRouter.put(
  "/departments/director",
  authMiddleware([]),
  async (req: Request, res: Response, next: NextFunction) => {
    await departmentController.assignDirector(req, res, next);
  },
);

departmentRouter.post(
  "/departments/patient",
  authMiddleware([Role.DIRECTOR, Role.DOCTOR]),
  async (req: Request, res: Response, next: NextFunction) => {
    await departmentController.assignPatient(req, res, next);
  },
);

departmentRouter.post(
  "/departments/doctor",
  authMiddleware([Role.DIRECTOR]),
  async (req: Request, res: Response, next: NextFunction) => {
    await departmentController.assignDoctor(req, res, next);
  },
);

departmentRouter.delete(
  "/departments/:departmentId/doctor/:doctorId",
  authMiddleware([Role.DIRECTOR]),
  async (req: Request, res: Response, next: NextFunction) => {
    await departmentController.unassignDoctor(req, res, next);
  },
);

departmentRouter.delete(
  "/departments/:departmentId/patient/:patientId",
  authMiddleware([Role.DIRECTOR, Role.DOCTOR]),
  async (req: Request, res: Response, next: NextFunction) => {
    await departmentController.unassignPatient(req, res, next);
  },
);

departmentRouter.put(
  "/departments/patient",
  authMiddleware([]),
  async (req: Request, res: Response, next: NextFunction) => {
    await departmentController.transferPatient(req, res, next);
  },
);

export default departmentRouter;
