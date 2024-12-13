import { NextFunction, Request, Response } from "express";
import { PrescriptionService } from "@prescription/service";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import {
  CreatePrescriptionDTO,
  DeletePrescriptionDTO,
  UpdatePrescriptionDTO,
} from "@prescription/dto";
import { ErrorCode, HttpException } from "@common/errors/httpException";
import {
  sendSuccessResponse,
  SuccessCode,
} from "@common/utils/sendSuccessResponse";
import { getExpirationDate, getIssueDate } from "@common/utils/time";

export class PrescriptionController {
  private prescriptionService: PrescriptionService;

  constructor(prescriptionService: PrescriptionService) {
    this.prescriptionService = prescriptionService;
  }

  async createPrescription(req: Request, res: Response, next: NextFunction) {
    const { appointmentId } = req.params;
    const issue = getIssueDate();
    const expiration = getExpirationDate(issue);
    const prescriptionDTO = plainToInstance(CreatePrescriptionDTO, {
      issue,
      expiration,
      appointmentId,
      ...req.body,
    });
    const errors = await validate(prescriptionDTO);

    if (errors.length > 0) {
      return next(new HttpException(ErrorCode.BAD_REQUEST, undefined, errors));
    }

    try {
      const prescription =
        await this.prescriptionService.createPrescription(prescriptionDTO);
      await sendSuccessResponse(res, SuccessCode.CREATED, { prescription });
    } catch (e: any) {
      next(new HttpException(ErrorCode.INTERNAL_SERVER_ERROR, e.message));
    }
  }

  async getPrescription(req: Request, res: Response, next: NextFunction) {
    const { prescriptionId } = req.params;

    try {
      const prescription =
        await this.prescriptionService.getPrescriptionById(prescriptionId);

      if (!prescription) {
        return next(new HttpException(ErrorCode.NOT_FOUND));
      }

      await sendSuccessResponse(res, SuccessCode.OK, { prescription });
    } catch (e: any) {
      next(new HttpException(ErrorCode.INTERNAL_SERVER_ERROR, e.message));
    }
  }

  async patchPrescription(req: Request, res: Response, next: NextFunction) {
    const { prescriptionId } = req.params;
    const updatePrescriptionDTO = plainToInstance(
      UpdatePrescriptionDTO,
      req.body,
    );
    const errors = await validate(updatePrescriptionDTO);

    if (errors.length > 0) {
      return next(new HttpException(ErrorCode.BAD_REQUEST, undefined, errors));
    }

    try {
      const prescription =
        await this.prescriptionService.patchPrescriptionStatus(
          prescriptionId,
          updatePrescriptionDTO,
        );

      await sendSuccessResponse(res, SuccessCode.OK, {
        prescription,
      });
    } catch (e: any) {
      next(new HttpException(ErrorCode.INTERNAL_SERVER_ERROR, e.message));
    }
  }

  async deletePrescription(req: Request, res: Response, next: NextFunction) {
    const { prescriptionId } = req.params;
    const deletePrescriptionDTO = plainToInstance(
      DeletePrescriptionDTO,
      prescriptionId,
    );
    const errors = await validate(deletePrescriptionDTO);

    if (errors.length > 0) {
      return next(new HttpException(ErrorCode.BAD_REQUEST, undefined, errors));
    }

    try {
      await this.prescriptionService.deletePrescription(prescriptionId);
      await sendSuccessResponse(res, SuccessCode.NO_CONTENT);
    } catch (e: any) {
      next(new HttpException(ErrorCode.INTERNAL_SERVER_ERROR, e.message));
    }
  }
}
