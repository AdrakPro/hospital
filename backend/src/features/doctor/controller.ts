import { NextFunction, Request, Response } from "express";
import { DoctorService } from "@doctor/service";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { CreateDoctorDTO, DeleteDoctorDTO, UpdateDoctorDTO } from "@doctor/dto";
import { ErrorCode, HttpException } from "@common/errors/httpException";
import {
  sendSuccessResponse,
  SuccessCode,
} from "@common/utils/sendSuccessResponse";

export class DoctorController {
  private doctorService: DoctorService;

  constructor(doctorService: DoctorService) {
    this.doctorService = doctorService;
  }

  async createDoctor(req: Request, res: Response, next: NextFunction) {
    const { personId } = req.params;
    const doctorDTO = plainToInstance(CreateDoctorDTO, {
      ...req.body,
      personId,
    });
    const errors = await validate(doctorDTO);

    if (errors.length > 0) {
      return next(new HttpException(ErrorCode.BAD_REQUEST, undefined, errors));
    }

    try {
      const doctor = await this.doctorService.createDoctor(doctorDTO);
      await sendSuccessResponse(res, SuccessCode.CREATED, { doctor });
    } catch (e: any) {
      next(new HttpException(ErrorCode.INTERNAL_SERVER_ERROR, e.message));
    }
  }

  async getDoctorById(req: Request, res: Response, next: NextFunction) {
    const { doctorId } = req.params;

    try {
      const doctor = await this.doctorService.getDoctorById(doctorId);

      if (!doctor) {
        return next(new HttpException(ErrorCode.NOT_FOUND));
      }

      await sendSuccessResponse(res, SuccessCode.OK, { doctor });
    } catch (e: any) {
      next(new HttpException(ErrorCode.INTERNAL_SERVER_ERROR, e.message));
    }
  }

  async updateDoctor(req: Request, res: Response, next: NextFunction) {
    const { doctorId } = req.params;
    const updateDoctorDTO = plainToInstance(UpdateDoctorDTO, req.body);
    const errors = await validate(updateDoctorDTO);

    if (errors.length > 0) {
      return next(new HttpException(ErrorCode.BAD_REQUEST, undefined, errors));
    }

    try {
      const updatedDoctor = await this.doctorService.updateDoctor(
        doctorId,
        updateDoctorDTO,
      );

      await sendSuccessResponse(res, SuccessCode.OK, { doctor: updatedDoctor });
    } catch (e: any) {
      next(new HttpException(ErrorCode.INTERNAL_SERVER_ERROR, e.message));
    }
  }

  async deleteDoctor(req: Request, res: Response, next: NextFunction) {
    const { doctorId } = req.params;
    const deleteDoctorDTO = plainToInstance(DeleteDoctorDTO, { doctorId });
    const errors = await validate(deleteDoctorDTO);

    if (errors.length > 0) {
      return next(new HttpException(ErrorCode.BAD_REQUEST, undefined, errors));
    }

    try {
      await this.doctorService.deleteDoctor(doctorId);
      await sendSuccessResponse(res, SuccessCode.NO_CONTENT);
    } catch (e: any) {
      next(new HttpException(ErrorCode.INTERNAL_SERVER_ERROR, e.message));
    }
  }
}
