import { NextFunction, Request, Response } from "express";
import { PatientService } from "@patient/service";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { CreatePatientDTO, DeletePatientDTO, UpdatePatientDTO } from "@patient/dto";
import { ErrorCode, HttpException } from "@common/errors/httpException";
import { sendSuccessResponse, SuccessCode } from "@common/utils/sendSuccessResponse";

export class PatientController {
  private patientService: PatientService;

  constructor(patientService: PatientService) {
    this.patientService = patientService;
  }

  async createPatient(req: Request, res: Response, next: NextFunction) {
    const patientDTO = plainToInstance(CreatePatientDTO, req.body);
    const errors = await validate(patientDTO);

    if (errors.length > 0) {
      return next(new HttpException(ErrorCode.BAD_REQUEST, undefined, errors));
    }

    try {
      const patient = await this.patientService.createPatient(patientDTO);
      await sendSuccessResponse(res, SuccessCode.CREATED, { patient });
    } catch (e: any) {
      next(new HttpException(ErrorCode.INTERNAL_SERVER_ERROR, e.message));
    }
  }

  async getAllPatients(req: Request, res: Response, next: NextFunction) {
    try {
      const patients = await this.patientService.getAllPatients();

      if (patients.length === 0) {
        return next(new HttpException(ErrorCode.NOT_FOUND));
      }

      await sendSuccessResponse(res, SuccessCode.OK, { patients });
    } catch (e: any) {
      next(new HttpException(ErrorCode.INTERNAL_SERVER_ERROR, e.message));
    }
  }

  async getPatientById(req: Request, res: Response, next: NextFunction) {
    const { patientId } = req.params;

    try {
      const patient = await this.patientService.getPatientById(patientId);

      if (!patient) {
        return next(new HttpException(ErrorCode.NOT_FOUND));
      }

      await sendSuccessResponse(res, SuccessCode.OK, { patient });
    } catch (e: any) {
      next(new HttpException(ErrorCode.INTERNAL_SERVER_ERROR, e.message));
    }
  }

  async updatePatient(req: Request, res: Response, next: NextFunction) {
    const updatePatientDTO = plainToInstance(UpdatePatientDTO, req.body);
    const errors = await validate(updatePatientDTO);

    if (errors.length > 0) {
      return next(new HttpException(ErrorCode.BAD_REQUEST, undefined, errors));
    }

    try {
      const patient = await this.patientService.updatePatient(updatePatientDTO);
      await sendSuccessResponse(res, SuccessCode.OK, { patient });
    } catch (e: any) {
      next(new HttpException(ErrorCode.INTERNAL_SERVER_ERROR, e.message));
    }
  }

  async deletePatient(req: Request, res: Response, next: NextFunction) {
    const { patientId } = req.params;
    const deletePatientDTO = plainToInstance(DeletePatientDTO, { patientId });
    const errors = await validate(deletePatientDTO);

    if (errors.length > 0) {
      return next(new HttpException(ErrorCode.BAD_REQUEST, undefined, errors));
    }

    try {
      await this.patientService.deletePatient(patientId);
      await sendSuccessResponse(res, SuccessCode.NO_CONTENT);
    } catch (e: any) {
      next(new HttpException(ErrorCode.INTERNAL_SERVER_ERROR, e.message));
    }
  }
}
