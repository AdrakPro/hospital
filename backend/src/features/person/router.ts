import { NextFunction, Request, Response, Router } from "express";
import { PersonController } from "@person/controller";
import { PersonService } from "@person/service";

const personRouter = Router();
const personController = new PersonController(new PersonService());

personRouter.get(
  "/persons/:personId",
  async (req: Request, res: Response, next: NextFunction) => {
    await personController.getPersonId(req, res, next);
  },
);

personRouter.post(
  "/persons",
  async (req: Request, res: Response, next: NextFunction) => {
    await personController.createPerson(req, res, next);
  },
);

personRouter.put(
  "/persons",
  async (req: Request, res: Response, next: NextFunction) => {
    await personController.updatePersonInfo(req, res, next);
  },
);

export default personRouter;
