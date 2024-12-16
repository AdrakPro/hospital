import { NextFunction, Request, Response } from "express";
import { PrescriptionService } from "@prescription/service";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import {
  CreatePrescriptionDTO,
  DeletePrescriptionDTO,
  UpdatePrescriptionDTO,
} from "@prescription/dto";
import { PrismaException } from "@common/errors/PrismaException";
import { sendSuccessResponse, SuccessCode } from "@common/utils/sendSuccessResponse";
import { NotFoundException } from "@common/errors/NotFoundException";
import { BadRequestException } from "@common/errors/BadRequestException";
import { PRESCRIPTION_MODEL } from "@common/constants/modelName";

export class PrescriptionController {
  private prescriptionService: PrescriptionService;

  constructor(prescriptionService: PrescriptionService) {
    this.prescriptionService = prescriptionService;
  }

  async createPrescription(req: Request, res: Response, next: NextFunction) {
    const prescriptionDTO = plainToInstance(CreatePrescriptionDTO, req.body);
    const errors = await validate(prescriptionDTO);

    if (errors.length > 0) {
      return next(new BadRequestException(PRESCRIPTION_MODEL, errors));
    }

    try {
      const prescription = await this.prescriptionService.createPrescription(prescriptionDTO);
      await sendSuccessResponse(res, SuccessCode.CREATED, { prescription });
    } catch (e: any) {
      next(new PrismaException(e));
    }
  }

  async getPrescription(req: Request, res: Response, next: NextFunction) {
    const { prescriptionId } = req.params;

    try {
      const prescription = await this.prescriptionService.getPrescriptionById(prescriptionId);

      if (!prescription) {
        return next(new NotFoundException());
      }

      await sendSuccessResponse(res, SuccessCode.OK, { prescription });
    } catch (e: any) {
      next(new PrismaException(e));
    }
  }

  async getAllPatientsPrescriptions(req: Request, res: Response, next: NextFunction) {
    const { patientId } = req.params;

    try {
      const prescriptions = await this.prescriptionService.getAllPatientsPrescriptions(patientId);

      if (!prescriptions) {
        return next(new NotFoundException());
      }

      await sendSuccessResponse(res, SuccessCode.OK, { prescriptions });
    } catch (e: any) {
      next(new PrismaException(e));
    }
  }

  async updatePrescription(req: Request, res: Response, next: NextFunction) {
    const updatePrescriptionDTO = plainToInstance(UpdatePrescriptionDTO, req.body);
    const errors = await validate(updatePrescriptionDTO);

    if (errors.length > 0) {
      return next(new BadRequestException(PRESCRIPTION_MODEL, errors));
    }

    try {
      const prescription =
        await this.prescriptionService.updatePrescriptionStatus(updatePrescriptionDTO);

      await sendSuccessResponse(res, SuccessCode.OK, {
        prescription,
      });
    } catch (e: any) {
      next(new PrismaException(e));
    }
  }

  async deletePrescription(req: Request, res: Response, next: NextFunction) {
    const { prescriptionId } = req.params;
    const prescriptionDTO = plainToInstance(DeletePrescriptionDTO, { prescriptionId });
    const errors = await validate(prescriptionDTO);

    if (errors.length > 0) {
      return next(new BadRequestException(PRESCRIPTION_MODEL, errors));
    }

    try {
      await this.prescriptionService.deletePrescription(prescriptionId);
      await sendSuccessResponse(res, SuccessCode.NO_CONTENT);
    } catch (e: any) {
      next(new PrismaException(e));
    }
  }
}
