import { NextFunction, Request, Response } from "express";
import { AppointmentService } from "@appointment/service";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { CreateAppointmentDTO, DeleteAppointmentDTO, UpdateAppointmentDTO } from "@appointment/dto";
import { PrismaException } from "@common/errors/PrismaException";
import { sendSuccessResponse, SuccessCode } from "@common/utils/sendSuccessResponse";
import { BadRequestException } from "@common/errors/BadRequestException";
import { APPOINTMENT_MODEL } from "@common/constants/modelName";
import { NotFoundException } from "@common/errors/NotFoundException";

export class AppointmentController {
  private appointmentService: AppointmentService;

  constructor(appointmentService: AppointmentService) {
    this.appointmentService = appointmentService;
  }

  async createAppointment(req: Request, res: Response, next: NextFunction) {
    const appointmentDTO = plainToInstance(CreateAppointmentDTO, req.body);
    const errors = await validate(appointmentDTO);

    if (errors.length > 0) {
      return next(new BadRequestException(APPOINTMENT_MODEL, errors));
    }

    try {
      const appointment = await this.appointmentService.createAppointment(appointmentDTO);
      await sendSuccessResponse(res, SuccessCode.CREATED, { appointment });
    } catch (e: any) {
      next(new PrismaException(e));
    }
  }

  async getAppointment(req: Request, res: Response, next: NextFunction) {
    const { appointmentId } = req.params;

    try {
      const appointment = await this.appointmentService.getAppointmentById(appointmentId);

      if (!appointment) {
        return next(new NotFoundException());
      }

      await sendSuccessResponse(res, SuccessCode.OK, { appointment });
    } catch (e: any) {
      next(new PrismaException(e));
    }
  }

  async getAllAppointments(req: Request, res: Response, next: NextFunction) {
    try {
      const appointments = await this.appointmentService.getAllAppointments();

      if (appointments.length === 0) {
        return next(new NotFoundException());
      }

      await sendSuccessResponse(res, SuccessCode.OK, { appointment: appointments });
    } catch (e: any) {
      next(new PrismaException(e));
    }
  }

  async updateAppointment(req: Request, res: Response, next: NextFunction) {
    const appointmentDTO = plainToInstance(UpdateAppointmentDTO, req.body);
    const errors = await validate(appointmentDTO);

    if (errors.length > 0) {
      return next(new BadRequestException(APPOINTMENT_MODEL, errors));
    }

    try {
      const appointment = await this.appointmentService.updateAppointment(appointmentDTO);
      await sendSuccessResponse(res, SuccessCode.OK, { appointment });
    } catch (e: any) {
      next(new PrismaException(e));
    }
  }

  async deleteAppointment(req: Request, res: Response, next: NextFunction) {
    const { appointmentId } = req.params;
    const deleteAppointmentDTO = plainToInstance(DeleteAppointmentDTO, {
      appointmentId,
    });
    const errors = await validate(deleteAppointmentDTO);

    if (errors.length > 0) {
      return next(new BadRequestException(APPOINTMENT_MODEL, errors));
    }

    try {
      await this.appointmentService.deleteAppointment(appointmentId);
      await sendSuccessResponse(res, SuccessCode.NO_CONTENT);
    } catch (e: any) {
      next(new PrismaException(e));
    }
  }
}
