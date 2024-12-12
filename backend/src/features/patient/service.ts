import { PrismaClient } from "@prisma/client";
import prisma from "@db/prisma";
import {
  CreatePatientDTO,
  ReadPatientDTO,
  UpdatePatientDTO,
} from "@patient/dto";

export class PatientService {
  private db: PrismaClient;

  constructor(db?: PrismaClient) {
    this.db = db || prisma;
  }

  async createPatient(patientDTO: CreatePatientDTO): Promise<ReadPatientDTO> {
    return this.db.patient.create({
      data: patientDTO,
    });
  }

  async getPatientById(patientId: string): Promise<ReadPatientDTO | null> {
    return this.db.patient.findUnique({
      where: { patientId },
      include: { person: true, department: true, appointments: true },
    });
  }

  async updatePatient(
    patientId: string,
    updateData: UpdatePatientDTO,
  ): Promise<ReadPatientDTO> {
    return this.db.patient.update({
      where: { patientId },
      data: updateData,
    });
  }

  async deletePatient(patientId: string): Promise<void> {
    await this.db.patient.delete({
      where: { patientId },
    });
  }
}
