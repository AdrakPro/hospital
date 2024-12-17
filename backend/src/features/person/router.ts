import { NextFunction, Request, Response, Router } from "express";
import { PersonController } from "@person/controller";
import { PersonService } from "@person/service";

const personRouter = Router();
const personController = new PersonController(new PersonService());

personRouter.get("/persons", async (req: Request, res: Response, next: NextFunction) => {
  await personController.getAllPersons(req, res, next);
});

personRouter.get("/persons/:personId", async (req: Request, res: Response, next: NextFunction) => {
  await personController.getPersonById(req, res, next);
});

personRouter.put("/persons", async (req: Request, res: Response, next: NextFunction) => {
  await personController.updatePersonInfo(req, res, next);
});

// should not in prod
personRouter.post("/persons", async (req: Request, res: Response, next: NextFunction) => {
  await personController.createPerson(req, res, next);
});

export default personRouter;
