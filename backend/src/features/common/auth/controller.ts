import { NextFunction, Request, Response } from "express";
import AuthService from "@auth/service";
import { plainToInstance } from "class-transformer";
import { LoginDTO } from "@auth/dto";
import { validate } from "class-validator";
import { BadRequestException } from "@common/errors/BadRequestException";
import { AUTH_MODEL } from "@common/constants/modelName";
import { HttpException } from "@common/errors/HttpException";
import { sendSuccessResponse } from "@common/utils/sendSuccessResponse";
import { personIdStore } from "@common/middlewares/authMiddleware";

class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const loginDTO = plainToInstance(LoginDTO, req.body);
    const errors = await validate(loginDTO);

    if (errors.length > 0) {
      return next(new BadRequestException(AUTH_MODEL, errors));
    }

    try {
      const result = await this.authService.login(req.body);

      await sendSuccessResponse(res, 200, result);
    } catch (e: any) {
      next(new HttpException(e.message, 400));
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    personIdStore.run({ personId: undefined }, () => {
      console.log("Logged out.");
    });

    try {
      await sendSuccessResponse(res, 200);
    } catch (e: any) {
      next(new HttpException(e.message, 400));
    }
  }
}

export default AuthController;
