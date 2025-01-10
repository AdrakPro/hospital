import { NextFunction, Request, Response } from "express";
import { DepartmentService } from "@department/service";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import {
  CreateDepartmentDTO,
  DeleteDepartmentDTO,
  DepartmentDoctorDTO,
  DepartmentPatientDTO,
  DepartmentTransferPatientDTO,
  UpdateDepartmentDTO,
} from "@department/dto";
import { PrismaException } from "@common/errors/PrismaException";
import { sendSuccessResponse, SuccessCode } from "@common/utils/sendSuccessResponse";
import { BadRequestException } from "@common/errors/BadRequestException";
import { DEPARTMENT_MODEL } from "@common/constants/modelName";
import { NotFoundException } from "@common/errors/NotFoundException";
import { AlreadyAssignedException } from "@common/errors/AlreadyAssignedException";
import { FullDepartmentException } from "@common/errors/FullDepartmentException";

export class DepartmentController {
  private departmentService: DepartmentService;

  constructor(departmentService: DepartmentService) {
    this.departmentService = departmentService;
  }

  async createDepartment(req: Request, res: Response, next: NextFunction) {
    const departmentDTO = plainToInstance(CreateDepartmentDTO, req.body);
    const errors = await validate(departmentDTO);

    if (errors.length > 0) {
      return next(new BadRequestException(DEPARTMENT_MODEL, errors));
    }

    try {
      const department = await this.departmentService.createDepartment(departmentDTO);
      await sendSuccessResponse(res, SuccessCode.CREATED, { department });
    } catch (e: any) {
      next(new PrismaException(e));
    }
  }

  async getAllDepartments(req: Request, res: Response, next: NextFunction) {
    try {
      const departments = await this.departmentService.getAllDepartments();

      if (departments.length === 0) {
        return next(new NotFoundException());
      }

      await sendSuccessResponse(res, SuccessCode.OK, { departments });
    } catch (e: any) {
      next(new PrismaException(e));
    }
  }

  async getDepartment(req: Request, res: Response, next: NextFunction) {
    const { departmentId } = req.params;

    try {
      const department = await this.departmentService.getDepartmentById(departmentId);

      if (!department) {
        return next(new NotFoundException());
      }

      await sendSuccessResponse(res, SuccessCode.OK, { department });
    } catch (e: any) {
      next(new PrismaException(e));
    }
  }

  async updateDepartment(req: Request, res: Response, next: NextFunction) {
    const departmentDTO = plainToInstance(UpdateDepartmentDTO, req.body);
    const errors = await validate(departmentDTO);

    if (errors.length > 0) {
      return next(new BadRequestException(DEPARTMENT_MODEL, errors));
    }

    try {
      const department = await this.departmentService.updateDepartment(departmentDTO);

      await sendSuccessResponse(res, SuccessCode.OK, { department });
    } catch (e: any) {
      next(new PrismaException(e));
    }
  }

  async deleteDepartment(req: Request, res: Response, next: NextFunction) {
    const { departmentId } = req.params;
    const departmentDTO = plainToInstance(DeleteDepartmentDTO, {
      departmentId,
    });
    const errors = await validate(departmentDTO);

    if (errors.length > 0) {
      return next(new BadRequestException(DEPARTMENT_MODEL, errors));
    }

    try {
      await this.departmentService.deleteDepartment(departmentId);
      await sendSuccessResponse(res, SuccessCode.NO_CONTENT);
    } catch (e: any) {
      next(new PrismaException(e));
    }
  }

  async assignDirector(req: Request, res: Response, next: NextFunction) {
    const directorDTO = plainToInstance(DepartmentDoctorDTO, req.body);
    const errors = await validate(directorDTO);

    if (errors.length > 0) {
      return next(new BadRequestException(DEPARTMENT_MODEL, errors));
    }

    try {
      const department = await this.departmentService.assignDirector(directorDTO);
      await sendSuccessResponse(res, SuccessCode.OK, { department });
    } catch (e: any) {
      next(new PrismaException(e));
    }
  }

  async assignDoctor(req: Request, res: Response, next: NextFunction) {
    const doctorDTO = plainToInstance(DepartmentDoctorDTO, req.body);
    const errors = await validate(doctorDTO);

    if (errors.length > 0) {
      return next(new BadRequestException(DEPARTMENT_MODEL, errors));
    }

    try {
      const isDoctorAlreadyInDepartment =
        await this.departmentService.isDoctorAlreadyInDepartment(doctorDTO);

      if (isDoctorAlreadyInDepartment) {
        next(new AlreadyAssignedException(false));
      }

      const department = await this.departmentService.assignDoctor(doctorDTO);
      await sendSuccessResponse(res, SuccessCode.OK, { department });
    } catch (e: any) {
      next(new PrismaException(e));
    }
  }

  async assignPatient(req: Request, res: Response, next: NextFunction) {
    const patientDTO = plainToInstance(DepartmentPatientDTO, req.body);
    const errors = await validate(patientDTO);

    if (errors.length > 0) {
      return next(new BadRequestException(DEPARTMENT_MODEL, errors));
    }

    try {
      const isPatientAlreadyInDepartment =
        await this.departmentService.isPatientAlreadyInDepartment(patientDTO);

      if (isPatientAlreadyInDepartment) {
        next(new AlreadyAssignedException(true));
      }

      const department = await this.departmentService.getDepartmentById(patientDTO.departmentId);

      if (department !== null && department.patientCount > department.bedCount) {
        next(new FullDepartmentException());
      }

      const updatedDepartment = await this.departmentService.assignPatient(patientDTO);
      await sendSuccessResponse(res, SuccessCode.OK, { department: updatedDepartment });
    } catch (e: any) {
      next(new PrismaException(e));
    }
  }

  async unassignDoctor(req: Request, res: Response, next: NextFunction) {
    const doctorDTO = plainToInstance(DepartmentDoctorDTO, req.params);
    const errors = await validate(doctorDTO);

    if (errors.length > 0) {
      return next(new BadRequestException(DEPARTMENT_MODEL, errors));
    }

    try {
      const isDoctorAlreadyInDepartment =
        await this.departmentService.isDoctorAlreadyInDepartment(doctorDTO);

      if (!isDoctorAlreadyInDepartment) {
        next(new NotFoundException());
      }

      const department = await this.departmentService.removeDoctorFromDepartment(doctorDTO);
      await sendSuccessResponse(res, SuccessCode.NO_CONTENT, { department });
    } catch (e: any) {
      next(new PrismaException(e));
    }
  }

  async unassignPatient(req: Request, res: Response, next: NextFunction) {
    const patientDTO = plainToInstance(DepartmentPatientDTO, req.params);
    const errors = await validate(patientDTO);

    if (errors.length > 0) {
      return next(new BadRequestException(DEPARTMENT_MODEL, errors));
    }

    try {
      const isPatientAlreadyInDepartment =
        await this.departmentService.isPatientAlreadyInDepartment(patientDTO);
      if (!isPatientAlreadyInDepartment) {
        next(new NotFoundException());
      }

      const department = await this.departmentService.removePatientFromDepartment(patientDTO);
      await sendSuccessResponse(res, SuccessCode.OK, { department });
    } catch (e: any) {
      next(new PrismaException(e));
    }
  }

  async transferPatient(req: Request, res: Response, next: NextFunction) {
    const patientDTO = plainToInstance(DepartmentTransferPatientDTO, req.body);
    const errors = await validate(patientDTO);

    if (errors.length > 0) {
      return next(new BadRequestException(DEPARTMENT_MODEL, errors));
    }

    try {
      const department = await this.departmentService.transferPatient(patientDTO);

      await sendSuccessResponse(res, SuccessCode.OK, { department });
    } catch (e: any) {
      next(new PrismaException(e));
    }
  }
}
