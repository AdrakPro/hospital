import { NextFunction, Request, Response } from "express";
import { DepartmentService } from "@department/service";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import {
  CreateDepartmentDTO,
  DeleteDepartmentDTO,
  UpdateDepartmentDTO,
} from "@department/dto";
import { ErrorCode, HttpException } from "@common/errors/httpException";
import {
  sendSuccessResponse,
  SuccessCode,
} from "@common/utils/sendSuccessResponse";

export class DepartmentController {
  private departmentService: DepartmentService;

  constructor(departmentService: DepartmentService) {
    this.departmentService = departmentService;
  }

  async createDepartment(req: Request, res: Response, next: NextFunction) {
    const departmentDTO = plainToInstance(CreateDepartmentDTO, req.body);
    const errors = await validate(departmentDTO);

    if (errors.length > 0) {
      return next(new HttpException(ErrorCode.BAD_REQUEST, undefined, errors));
    }

    try {
      const department =
        await this.departmentService.createDepartment(departmentDTO);
      await sendSuccessResponse(res, SuccessCode.CREATED, { department });
    } catch (e: any) {
      next(new HttpException(ErrorCode.INTERNAL_SERVER_ERROR, e.message));
    }
  }

  async getDepartment(req: Request, res: Response, next: NextFunction) {
    const { departmentId } = req.params;

    try {
      const department =
        await this.departmentService.getDepartmentById(departmentId);

      if (!department) {
        return next(new HttpException(ErrorCode.NOT_FOUND));
      }

      await sendSuccessResponse(res, SuccessCode.OK, { department });
    } catch (e: any) {
      next(new HttpException(ErrorCode.INTERNAL_SERVER_ERROR, e.message));
    }
  }

  async updateDepartment(req: Request, res: Response, next: NextFunction) {
    const { departmentId } = req.params;
    const updateDepartmentDTO = plainToInstance(UpdateDepartmentDTO, req.body);
    const errors = await validate(updateDepartmentDTO);

    if (errors.length > 0) {
      return next(new HttpException(ErrorCode.BAD_REQUEST, undefined, errors));
    }

    try {
      const updatedDepartment = await this.departmentService.updateDepartment(
        departmentId,
        updateDepartmentDTO,
      );

      await sendSuccessResponse(res, SuccessCode.OK, {
        department: updatedDepartment,
      });
    } catch (e: any) {
      next(new HttpException(ErrorCode.INTERNAL_SERVER_ERROR, e.message));
    }
  }

  async deleteDepartment(req: Request, res: Response, next: NextFunction) {
    const { departmentId } = req.params;
    const deleteDepartmentDTO = plainToInstance(DeleteDepartmentDTO, {
      departmentId,
    });
    const errors = await validate(deleteDepartmentDTO);

    if (errors.length > 0) {
      return next(new HttpException(ErrorCode.BAD_REQUEST, undefined, errors));
    }

    try {
      await this.departmentService.deleteDepartment(departmentId);
      await sendSuccessResponse(res, SuccessCode.NO_CONTENT);
    } catch (e: any) {
      next(new HttpException(ErrorCode.INTERNAL_SERVER_ERROR, e.message));
    }
  }
}
