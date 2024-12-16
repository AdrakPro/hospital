import { PrescriptionStatus, PrismaClient } from "@prisma/client";
import prisma from "@db/prisma";
import {
  CreatePrescriptionDTO,
  ReadPrescriptionDTO,
  UpdatePrescriptionDTO,
} from "@prescription/dto";
import { getExpirationDate, getIssueDate } from "@common/utils/time";

export class PrescriptionService {
  private db: PrismaClient;

  constructor(db?: PrismaClient) {
    this.db = db || prisma;
  }

  async createPrescription(prescriptionDTO: CreatePrescriptionDTO): Promise<ReadPrescriptionDTO> {
    const issue = getIssueDate();
    const expiration = getExpirationDate(issue);

    return this.db.prescription.create({
      data: { ...prescriptionDTO, status: PrescriptionStatus.ACTIVE, issue, expiration },
    });
  }

  async getAllPatientsPrescriptions(patientId: string): Promise<ReadPrescriptionDTO[]> {
    const appointments = await this.db.appointment.findMany({
      where: { patientId },
      include: { prescriptions: true },
    });

    return appointments.flatMap((appointment) => appointment.prescriptions);
  }

  async getPrescriptionById(prescriptionId: string): Promise<ReadPrescriptionDTO | null> {
    return this.db.prescription.findUnique({
      where: { prescriptionId },
    });
  }

  async updatePrescriptionStatus(updateData: UpdatePrescriptionDTO): Promise<ReadPrescriptionDTO> {
    const { prescriptionId, status } = updateData;

    return this.db.prescription.update({
      where: { prescriptionId },
      data: {
        status,
      },
    });
  }

  async deletePrescription(prescriptionId: string): Promise<void> {
    await this.db.prescription.delete({
      where: { prescriptionId },
    });
  }
}
