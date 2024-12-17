import AuthService from "@common/auth/service";
import { NextFunction, Request, Response } from "express";
import { HttpException } from "@common/errors/HttpException";

class AuthMiddleware {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  async authorize(req: Request, res: Response, next: NextFunction) {
    try {
      const { authorization } = req.headers;
      if (!authorization) {
        return next(new HttpException("Unauthorized", 401));
      }
      const [bearer, token] = authorization.split(" ");
      if (bearer !== "Bearer") {
        return next(new HttpException("Unauthorized", 401));
      }
      const { isValid } = await this.authService.verifyToken(token);

      if (!isValid) {
        return next(new HttpException("Unauthorized", 401));
      }
      next();
    } catch (e: any) {
      next(new HttpException(e.message, 500));
    }
  }
}

export default AuthMiddleware;
