import { PersonRole, PrismaClient } from "@prisma/client";
import { CreateDoctorDTO, ReadDoctorDTO, UpdateDoctorDTO } from "@doctor/dto";
import prisma from "@db/prisma";

export class DoctorService {
  private db: PrismaClient;

  constructor(db?: PrismaClient) {
    this.db = db || prisma;
  }

  async createDoctor(doctorDTO: CreateDoctorDTO): Promise<ReadDoctorDTO> {
    return this.db.$transaction(async (tx) => {
      const person = await tx.person.create({
        data: {
          ...doctorDTO.person,
          role: PersonRole.DOCTOR,
        },
      });

      return tx.doctor.create({
        data: {
          personId: person.personId,
          specialization: doctorDTO.specialization,
          room: doctorDTO.room,
          workStart: doctorDTO.workStart,
          workEnd: doctorDTO.workEnd,
        },
      });
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

  async getAllDoctors(): Promise<ReadDoctorDTO[]> {
    return this.db.doctor.findMany();
  }

  async updateDoctor(updateData: UpdateDoctorDTO): Promise<ReadDoctorDTO> {
    const { doctorId } = updateData;

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
