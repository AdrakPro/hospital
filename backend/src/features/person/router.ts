import { NextFunction, Request, Response, Router } from "express";
import { PersonController } from "@person/controller";
import { PersonService } from "@person/service";

const personRouter = Router();
const personController = new PersonController(new PersonService());

personRouter.post(
  "/person",
  async (req: Request, res: Response, next: NextFunction) => {
    await personController.createPerson(req, res, next);
  },
);

personRouter.get(
  "/person/:personId",
  async (req: Request, res: Response, next: NextFunction) => {
    await personController.getPerson(req, res, next);
  },
);

personRouter.patch(
  "/person/:personId",
  async (req: Request, res: Response, next: NextFunction) => {
    await personController.updatePersonInfo(req, res, next);
  },
);

export default personRouter;
