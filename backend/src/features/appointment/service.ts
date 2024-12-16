import { AppointmentStatus, PrismaClient } from "@prisma/client";
import prisma from "@db/prisma";
import { CreateAppointmentDTO, ReadAppointmentDTO, UpdateAppointmentDTO } from "@appointment/dto";

export class AppointmentService {
  private db: PrismaClient;

  constructor(db?: PrismaClient) {
    this.db = db || prisma;
  }

  async createAppointment(appointmentDTO: CreateAppointmentDTO): Promise<ReadAppointmentDTO> {
    return this.db.appointment.create({
      data: {
        ...appointmentDTO,
        status: AppointmentStatus.SCHEDULED,
      },
    });
  }

  async getAllAppointments(): Promise<ReadAppointmentDTO[]> {
    return this.db.appointment.findMany();
  }

  async getAppointmentById(appointmentId: string): Promise<ReadAppointmentDTO | null> {
    return this.db.appointment.findUnique({
      where: { appointmentId },
      include: {
        doctor: true,
        patient: true,
        prescriptions: true,
      },
    });
  }

  async updateAppointment(updateData: UpdateAppointmentDTO): Promise<ReadAppointmentDTO> {
    const { appointmentId } = updateData;

    return this.db.appointment.update({
      where: { appointmentId },
      data: updateData,
    });
  }

  async deleteAppointment(appointmentId: string): Promise<void> {
    await this.db.appointment.delete({
      where: { appointmentId },
    });
  }
}
