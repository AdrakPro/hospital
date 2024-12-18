import { PersonRole, PrismaClient } from "@prisma/client";
import prisma from "@db/prisma";
import {
  CreateDepartmentDTO,
  DepartmentDoctorDTO,
  DepartmentPatientDTO,
  DepartmentTransferPatientDTO,
  ReadDepartmentDTO,
  UpdateDepartmentDTO,
} from "@department/dto";
import { ReadPatientDTO } from "@patient/dto";

export class DepartmentService {
  private db: PrismaClient;

  constructor(db?: PrismaClient) {
    this.db = db || prisma;
  }

  async createDepartment(departmentDTO: CreateDepartmentDTO): Promise<ReadDepartmentDTO> {
    return this.db.$transaction(async (tx) => {
      const department = await tx.department.create({
        data: departmentDTO,
      });

      const departmentDoctorDTO = {
        doctorId: department.directorId,
        departmentId: department.departmentId,
      };

      return this.assignDirector(departmentDoctorDTO);
    });
  }

  async getAllDepartments(): Promise<ReadDepartmentDTO[]> {
    return this.db.department.findMany();
  }

  async getDepartmentById(
    departmentId: string, // add type in future
  ): Promise<ReadDepartmentDTO | null> {
    return this.db.department.findUnique({
      where: { departmentId },
      include: {
        patients: true,
        doctors: true,
      },
    });
  }

  async updateDepartment(updateData: UpdateDepartmentDTO): Promise<ReadDepartmentDTO> {
    const { departmentId } = updateData;

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

  async assignDoctor(doctorDTO: DepartmentDoctorDTO): Promise<ReadDepartmentDTO> {
    const { departmentId, doctorId } = doctorDTO;

    return prisma.$transaction(async (tx) => {
      await tx.doctor.update({
        where: { doctorId },
        data: { departmentId },
      });

      return tx.department.update({
        where: { departmentId },
        data: {
          doctorCount: {
            increment: 1,
          },
        },
      });
    });
  }

  async assignPatient(patientDTO: DepartmentPatientDTO): Promise<ReadDepartmentDTO> {
    const { departmentId, patientId } = patientDTO;

    return prisma.$transaction(async (tx) => {
      await tx.patient.update({
        where: { patientId },
        data: { departmentId },
      });

      return tx.department.update({
        where: { departmentId },
        data: {
          patientCount: {
            increment: 1,
          },
        },
      });
    });
  }

  async removePreviousDirector(departmentId: string): Promise<void> {
    const department = await this.db.department.findUnique({
      where: { departmentId },
      select: { directorId: true },
    });

    if (department?.directorId) {
      const prevDirector = await this.db.doctor.findUnique({
        where: { doctorId: department.directorId },
        select: { personId: true },
      });

      if (prevDirector) {
        await this.db.person.update({
          where: { personId: prevDirector.personId },
          data: { role: PersonRole.DOCTOR },
        });
      }
    }
  }

  async assignDirector(directorDTO: DepartmentDoctorDTO): Promise<ReadDepartmentDTO> {
    const { departmentId, doctorId } = directorDTO;

    return this.db.$transaction(async (tx) => {
      await this.removePreviousDirector(departmentId);

      const director = await tx.doctor.update({
        where: { doctorId },
        data: { departmentId },
      });

      await tx.person.update({
        where: { personId: director?.personId },
        data: {
          role: PersonRole.DIRECTOR,
        },
      });

      return tx.department.update({
        where: { departmentId },
        data: {
          patientCount: {
            increment: 1,
          },
        },
      });
    });
  }

  async isPatientAlreadyInDepartment(patientDTO: DepartmentPatientDTO): Promise<boolean> {
    const { patientId, departmentId } = patientDTO;
    const patient = await this.db.patient.findUnique({
      where: { patientId, departmentId },
    });

    return patient !== null;
  }

  async isDoctorAlreadyInDepartment(doctorDTO: DepartmentDoctorDTO): Promise<boolean> {
    const { doctorId, departmentId } = doctorDTO;
    const doctor = await this.db.doctor.findUnique({
      where: { doctorId, departmentId },
    });

    return doctor !== null;
  }

  async removeDoctorFromDepartment(
    doctorDTO: DepartmentDoctorDTO,
  ): Promise<ReadDepartmentDTO | null> {
    const { doctorId, departmentId } = doctorDTO;

    return prisma.$transaction(async (tx) => {
      await tx.doctor.update({
        where: { doctorId },
        data: { departmentId: null },
      });

      return tx.department.update({
        where: { departmentId },
        data: {
          doctorCount: {
            decrement: 1,
          },
        },
      });
    });
  }

  async removePatientFromDepartment(
    patientDTO: DepartmentPatientDTO,
  ): Promise<ReadDepartmentDTO | null> {
    const { patientId, departmentId } = patientDTO;

    return prisma.$transaction(async (tx) => {
      await tx.patient.update({
        where: { patientId },
        data: { departmentId: null, dateOfDischarge: new Date() },
      });

      return tx.department.update({
        where: { departmentId },
        data: {
          patientCount: {
            decrement: 1,
          },
        },
      });
    });
  }

  async transferPatient(patientDTO: DepartmentTransferPatientDTO): Promise<ReadPatientDTO> {
    const { patientId, oldDepartmentId, newDepartmentId } = patientDTO;

    return this.db.$transaction(async (tx) => {
      await tx.department.update({
        where: { departmentId: oldDepartmentId },
        data: {
          patientCount: { decrement: 1 },
        },
      });

      await tx.department.update({
        where: { departmentId: newDepartmentId },
        data: {
          patientCount: { increment: 1 },
        },
      });

      return tx.patient.update({
        where: { patientId },
        data: {
          departmentId: newDepartmentId,
          dateOfAdmission: new Date(),
        },
      });
    });
  }
}
