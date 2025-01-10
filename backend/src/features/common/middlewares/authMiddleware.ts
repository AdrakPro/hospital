import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UnauthorizedException } from "@common/errors/UnauthorizedException";
import { ForbiddenException } from "@common/errors/ForbiddenException";
import { AsyncLocalStorage } from "async_hooks";

const JWT_SECRET = process.env.JWT_SECRET || "mega";

export const personIdStore = new AsyncLocalStorage<{ personId: string | undefined }>();

export const authMiddleware = (allowedRoles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return next(new UnauthorizedException());
    }

    try {
      const payload: any = jwt.verify(token, JWT_SECRET);

      const { role, personId } = payload;

      if (role === Role.ADMIN) {
        savePersonId(personId, next);
        return;
      }

      if (!allowedRoles.includes(role)) {
        return next(new ForbiddenException());
      }

      savePersonId(personId, next);
    } catch (e: any) {
      next(new UnauthorizedException());
    }
  };
};

const savePersonId = (personId: string, next: NextFunction) => {
  personIdStore.run({ personId }, () => {
    console.log("AsyncLocalStorage initialized with personId:", personId);
    next();
  });
};

export enum Role {
  ADMIN = "ADMIN",
  PATIENT = "PATIENT",
  DOCTOR = "DOCTOR",
  DIRECTOR = "DIRECTOR",
}
