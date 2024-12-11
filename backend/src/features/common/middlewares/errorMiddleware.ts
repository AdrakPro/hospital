import { HttpException } from "@common/errors/HttpException";
import { NextFunction, Request, Response } from "express";

export const errorMiddleware = (
  e: HttpException,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(e);

  const errorBody = {
    status: "error",
    statusCode: e.statusCode,
    message: e.message,
  };

  if (e.errors) {
    Object.assign(errorBody, { ...errorBody, errors: e.errors });
  }

  res.status(e.statusCode).json({
    ...errorBody,
  });
};
