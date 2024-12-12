import { PrismaClient } from "@prisma/client";
import prisma from "@db/prisma";
import { CreateDoctorDTO, ReadDoctorDTO, UpdateDoctorDTO } from "@doctor/dto";

export class DoctorService {
  private db: PrismaClient;

  constructor(db?: PrismaClient) {
    this.db = db || prisma;
  }

  async createDoctor(doctorDTO: CreateDoctorDTO): Promise<ReadDoctorDTO> {
    return this.db.doctor.create({
      data: doctorDTO,
    });
  }

  async getDoctorById(doctorId: string): Promise<ReadDoctorDTO | null> {
    return this.db.doctor.findUnique({
      where: { doctorId },
      include: {
        person: true,
        department: true,
        director: true,
        appointments: true,
      },
    });
  }

  async updateDoctor(
    doctorId: string,
    updateData: UpdateDoctorDTO,
  ): Promise<ReadDoctorDTO> {
    return this.db.doctor.update({
      where: { doctorId },
      data: updateData,
    });
  }

  async deleteDoctor(doctorId: string): Promise<void> {
    await this.db.doctor.delete({
      where: { doctorId },
    });
  }
}
