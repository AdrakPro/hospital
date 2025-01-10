import { NextFunction, Request, Response, Router } from "express";
import { PersonController } from "@person/controller";
import { PersonService } from "@person/service";
import { authMiddleware, Role } from "@common/middlewares/authMiddleware";

const personRouter = Router();
const personController = new PersonController(new PersonService());

personRouter.get(
  "/persons",
  authMiddleware([]),
  async (req: Request, res: Response, next: NextFunction) => {
    await personController.getAllPersons(req, res, next);
  },
);

personRouter.get(
  "/persons/:personId",
  authMiddleware([Role.PATIENT]),
  async (req: Request, res: Response, next: NextFunction) => {
    await personController.getPersonById(req, res, next);
  },
);

personRouter.put(
  "/persons",
  authMiddleware([Role.PATIENT]),
  async (req: Request, res: Response, next: NextFunction) => {
    await personController.updatePersonInfo(req, res, next);
  },
);

// should not be in prod
personRouter.post(
  "/persons",
  authMiddleware([]),
  async (req: Request, res: Response, next: NextFunction) => {
    await personController.createPerson(req, res, next);
  },
);

export default personRouter;
