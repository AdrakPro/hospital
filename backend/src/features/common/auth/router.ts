import { NextFunction, Request, Response, Router } from "express";
import AuthController from "@common/auth/controller";
import AuthService from "@common/auth/service";

const authRouter = Router();
const authController = new AuthController(new AuthService());

authRouter.route("/login").post(async (req: Request, res: Response, next: NextFunction) => {
  await authController.login(req, res, next);
});

authRouter.route("/logout").post(async (req: Request, res: Response, next: NextFunction) => {
  await authController.logout(req, res, next);
});

export default authRouter;
