import { HttpException } from "@common/errors/httpException";
import { NextFunction, Request, Response } from "express";

export const errorMiddleware = (
  e: HttpException,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(e);

  const body = {
    status: "error",
    statusCode: e.statusCode,
    message: e.message,
  };

  if (e.errors) {
    Object.assign(body, {
      ...body,
      errors: e.errors,
    });
  }

  if (e.details) {
    Object.assign(body, {
      ...body,
      details: e.details,
    });
  }

  res.status(e.statusCode).json(body);
};
