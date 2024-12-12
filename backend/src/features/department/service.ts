import { PrismaClient } from "@prisma/client";
import prisma from "@db/prisma";
import {
  CreateDepartmentDTO,
  ReadDepartmentDTO,
  UpdateDepartmentDTO,
} from "@department/dto";

export class DepartmentService {
  private db: PrismaClient;

  constructor(db?: PrismaClient) {
    this.db = db || prisma;
  }

  async createDepartment(
    departmentDTO: CreateDepartmentDTO,
  ): Promise<ReadDepartmentDTO> {
    return this.db.department.create({
      data: departmentDTO,
    });
  }

  async getDepartmentById(
    departmentId: string,
  ): Promise<ReadDepartmentDTO | null> {
    return this.db.department.findUnique({
      where: { departmentId },
      include: {
        director: true,
        doctors: true,
        patients: true,
      },
    });
  }

  async updateDepartment(
    departmentId: string,
    updateData: UpdateDepartmentDTO,
  ): Promise<ReadDepartmentDTO> {
    return this.db.department.update({
      where: { departmentId },
      data: updateData,
    });
  }

  async deleteDepartment(departmentId: string): Promise<void> {
    await this.db.department.delete({
      where: { departmentId },
    });
  }
}
