import Service from "@common/auth/service";
import { PersonService } from "@person/service";
import { NextFunction, Request, Response } from "express";
import { sendSuccessResponse, SuccessCode } from "@common/utils/sendSuccessResponse";
import { AuthException } from "@common/errors/AuthException";
import { PrismaException } from "@common/errors/PrismaException";
import { HttpException } from "@common/errors/HttpException";

class AuthController {
  private authService: Service;
  private personService: PersonService;

  constructor(authService: Service, personService: PersonService) {
    this.authService = authService;
    this.personService = personService;
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.cookies.auth_token) {
        return next(new HttpException("User is already logged in.", 400));
      }

      const { username, password } = req.body;
      const person = await this.personService.getFullPersonByUsername(username);
      const { isValid, jwt } = await this.authService.login(person, password);

      if (!isValid) {
        return next(new AuthException("Invalid username or password."));
      }

      res.cookie("auth_token", jwt, {
        httpOnly: true, // Makes the cookie accessible only to the server
        secure: process.env.NODE_ENV === "production",
        maxAge: 2 * 60 * 60 * 1000,
      });

      await sendSuccessResponse(res, SuccessCode.OK, { jwt });
    } catch (e: any) {
      next(new PrismaException(e));
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.cookies.auth_token) {
        return next(new AuthException("User is not logged in."));
      }

      res.clearCookie("auth_token");
      await sendSuccessResponse(res, SuccessCode.OK, { message: "Logged out successfully" });
    } catch (e: any) {
      next(new HttpException(e.message, 500));
    }
  }
}

export default AuthController;
