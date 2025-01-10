import { Response } from "express";

export const sendSuccessResponse = async (
  res: Response,
  statusCode: SuccessCode,
  data?: any,
) => {
  const body = {
    status: "success",
    statusCode,
  };

  if (data) {
    Object.assign(body, { ...body, data });
  }

  res.status(statusCode).json(body);
};

export enum SuccessCode {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
}
