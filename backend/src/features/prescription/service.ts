import { PrescriptionStatus, PrismaClient } from "@prisma/client";
import prisma from "@db/prisma";
import {
  CreatePrescriptionDTO,
  ReadPrescriptionDTO,
  UpdatePrescriptionDTO,
} from "@prescription/dto";

export class PrescriptionService {
  private db: PrismaClient;

  constructor(db?: PrismaClient) {
    this.db = db || prisma;
  }

  async createPrescription(
    prescriptionDTO: CreatePrescriptionDTO,
  ): Promise<ReadPrescriptionDTO> {
    return this.db.prescription.create({
      data: { status: PrescriptionStatus.ACTIVE, ...prescriptionDTO },
    });
  }

  async getPrescriptionById(
    prescriptionId: string,
  ): Promise<ReadPrescriptionDTO | null> {
    return this.db.prescription.findUnique({
      where: { prescriptionId },
    });
  }

  async patchPrescriptionStatus(
    prescriptionId: string,
    updateData: UpdatePrescriptionDTO,
  ): Promise<ReadPrescriptionDTO> {
    return this.db.prescription.update({
      where: { prescriptionId },
      data: {
        status: updateData.status,
      },
    });
  }

  async deletePrescription(prescriptionId: string): Promise<void> {
    await this.db.prescription.delete({
      where: { prescriptionId },
    });
  }
}
