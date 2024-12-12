import { IsDate, IsEnum, IsNotEmpty, IsUUID } from "class-validator";
import { AppointmentStatus } from "@prisma/client";

export class CreateAppointmentDTO {
  @IsNotEmpty()
  @IsUUID()
  patientId: string;

  @IsNotEmpty()
  @IsDate()
  date: Date;

  @IsNotEmpty()
  @IsEnum(AppointmentStatus)
  status: AppointmentStatus;

  @IsNotEmpty()
  @IsUUID()
  doctorId: string;
}

export class UpdateAppointmentDTO {
  @IsNotEmpty()
  @IsDate()
  date: Date;

  @IsNotEmpty()
  @IsEnum(AppointmentStatus)
  status: AppointmentStatus;
}

export class DeleteAppointmentDTO {
  @IsNotEmpty()
  @IsUUID()
  appointmentId: string;
}

export class ReadAppointmentDTO {
  appointmentId: string;
  patientId: string;
  date: Date;
  status: AppointmentStatus;
  doctorId: string;
}
