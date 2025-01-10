import { NextFunction, Request, Response } from "express";
import { DoctorService } from "@doctor/service";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { CreateDoctorDTO, DeleteDoctorDTO, UpdateDoctorDTO } from "@doctor/dto";
import { PrismaException } from "@common/errors/PrismaException";
import { sendSuccessResponse, SuccessCode } from "@common/utils/sendSuccessResponse";
import { BadRequestException } from "@common/errors/BadRequestException";
import { DOCTOR_MODEL } from "@common/constants/modelName";
import { NotFoundException } from "@common/errors/NotFoundException";

export class DoctorController {
  private doctorService: DoctorService;

  constructor(doctorService: DoctorService) {
    this.doctorService = doctorService;
  }

  async createDoctor(req: Request, res: Response, next: NextFunction) {
    const doctorDTO = plainToInstance(CreateDoctorDTO, req.body);
    const errors = await validate(doctorDTO);

    if (errors.length > 0) {
      return next(new BadRequestException(DOCTOR_MODEL, errors));
    }

    try {
      const doctor = await this.doctorService.createDoctor(doctorDTO);
      await sendSuccessResponse(res, SuccessCode.CREATED, { doctor });
    } catch (e: any) {
      next(new PrismaException(e));
    }
  }

  async getAllDoctors(req: Request, res: Response, next: NextFunction) {
    try {
      const doctors = await this.doctorService.getAllDoctors();

      if (doctors.length === 0) {
        next(new NotFoundException());
      }

      await sendSuccessResponse(res, SuccessCode.OK, { doctors });
    } catch (e: any) {
      next(new PrismaException(e));
    }
  }

  async getDoctorById(req: Request, res: Response, next: NextFunction) {
    const { doctorId } = req.params;

    try {
      const doctor = await this.doctorService.getDoctorById(doctorId);

      if (!doctor) {
        return next(new NotFoundException());
      }

      await sendSuccessResponse(res, SuccessCode.OK, { doctor });
    } catch (e: any) {
      next(new PrismaException(e));
    }
  }

  async updateDoctor(req: Request, res: Response, next: NextFunction) {
    const updateDoctorDTO = plainToInstance(UpdateDoctorDTO, req.body);
    const errors = await validate(updateDoctorDTO);

    if (errors.length > 0) {
      return next(new BadRequestException(DOCTOR_MODEL, errors));
    }

    try {
      const doctor = await this.doctorService.updateDoctor(updateDoctorDTO);

      await sendSuccessResponse(res, SuccessCode.OK, { doctor });
    } catch (e: any) {
      next(new PrismaException(e));
    }
  }

  async deleteDoctor(req: Request, res: Response, next: NextFunction) {
    const { doctorId } = req.params;
    const deleteDoctorDTO = plainToInstance(DeleteDoctorDTO, { doctorId });
    const errors = await validate(deleteDoctorDTO);

    if (errors.length > 0) {
      return next(new BadRequestException(DOCTOR_MODEL, errors));
    }

    try {
      await this.doctorService.deleteDoctor(doctorId);
      await sendSuccessResponse(res, SuccessCode.NO_CONTENT);
    } catch (e: any) {
      next(new PrismaException(e));
    }
  }
}
