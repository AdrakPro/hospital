import { Request, Response, Router } from "express";
import { PersonController } from "@person/controller";
import { PersonService } from "@person/service";

const personRouter = Router();
const personController = new PersonController(new PersonService());

personRouter.post("/persons", async (req: Request, res: Response) => {
  await personController.createPerson(req, res);
});

export default personRouter;
