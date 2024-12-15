import { NextFunction, Request, Response } from "express";
import { HttpException } from "@common/errors/HttpException";

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

  if (e.meta) {
    Object.assign(body, { ...body, meta: e.meta });
  }

  res.status(e.statusCode).json({
    ...body,
    meta: e.meta,
    statusCode: e.statusCode,
  });
};
