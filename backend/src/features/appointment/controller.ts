import { NextFunction, Request, Response } from "express";
import { AppointmentService } from "@appointment/service";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import {
  CreateAppointmentDTO,
  DeleteAppointmentDTO,
  UpdateAppointmentDTO,
} from "@appointment/dto";
import { ErrorCode, HttpException } from "@common/errors/httpException";
import {
  sendSuccessResponse,
  SuccessCode,
} from "@common/utils/sendSuccessResponse";

export class AppointmentController {
  private appointmentService: AppointmentService;

  constructor(appointmentService: AppointmentService) {
    this.appointmentService = appointmentService;
  }

  async createAppointment(req: Request, res: Response, next: NextFunction) {
    const appointmentDTO = plainToInstance(CreateAppointmentDTO, req.body);
    const errors = await validate(appointmentDTO);

    if (errors.length > 0) {
      return next(new HttpException(ErrorCode.BAD_REQUEST, undefined, errors));
    }

    try {
      const appointment =
        await this.appointmentService.createAppointment(appointmentDTO);
      await sendSuccessResponse(res, SuccessCode.CREATED, { appointment });
    } catch (e: any) {
      next(new HttpException(ErrorCode.INTERNAL_SERVER_ERROR, e.message));
    }
  }

  async getAppointment(req: Request, res: Response, next: NextFunction) {
    const { appointmentId } = req.params;

    try {
      const appointment =
        await this.appointmentService.getAppointmentById(appointmentId);

      if (!appointment) {
        return next(new HttpException(ErrorCode.NOT_FOUND));
      }

      await sendSuccessResponse(res, SuccessCode.OK, { appointment });
    } catch (e: any) {
      next(new HttpException(ErrorCode.INTERNAL_SERVER_ERROR, e.message));
    }
  }

  async updateAppointment(req: Request, res: Response, next: NextFunction) {
    const { appointmentId } = req.params;
    const updateAppointmentDTO = plainToInstance(
      UpdateAppointmentDTO,
      req.body,
    );
    const errors = await validate(updateAppointmentDTO);

    if (errors.length > 0) {
      return next(new HttpException(ErrorCode.BAD_REQUEST, undefined, errors));
    }

    try {
      const updatedAppointment =
        await this.appointmentService.updateAppointment(
          appointmentId,
          updateAppointmentDTO,
        );
      await sendSuccessResponse(res, SuccessCode.OK, {
        appointment: updatedAppointment,
      });
    } catch (e: any) {
      next(new HttpException(ErrorCode.INTERNAL_SERVER_ERROR, e.message));
    }
  }

  async deleteAppointment(req: Request, res: Response, next: NextFunction) {
    const { appointmentId } = req.params;
    const deleteAppointmentDTO = plainToInstance(DeleteAppointmentDTO, {
      appointmentId,
    });
    const errors = await validate(deleteAppointmentDTO);

    if (errors.length > 0) {
      return next(new HttpException(ErrorCode.BAD_REQUEST, undefined, errors));
    }

    try {
      await this.appointmentService.deleteAppointment(appointmentId);
      await sendSuccessResponse(res, SuccessCode.NO_CONTENT);
    } catch (e: any) {
      next(new HttpException(ErrorCode.INTERNAL_SERVER_ERROR, e.message));
    }
  }
}