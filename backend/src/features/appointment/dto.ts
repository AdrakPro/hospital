import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsUUID } from "class-validator";
import { AppointmentStatus } from "@prisma/client";
import { MinDate } from "@common/validators/minDateValidator";

export class CreateAppointmentDTO {
  @IsNotEmpty()
  @IsUUID(4)
  patientId: string;

  @IsNotEmpty()
  @IsDateString()
  @MinDate(new Date(Date.now() + 1000))
  date: Date;

  @IsNotEmpty()
  @IsUUID(4)
  doctorId: string;
}

export class UpdateAppointmentDTO {
  @IsNotEmpty()
  @IsUUID(4)
  appointmentId: string;

  @IsNotEmpty()
  @IsOptional()
  @IsDateString()
  @MinDate(new Date(Date.now() + 1000))
  date?: Date;

  @IsNotEmpty()
  @IsOptional()
  @IsEnum(AppointmentStatus)
  status?: AppointmentStatus;
}

export class DeleteAppointmentDTO {
  @IsNotEmpty()
  @IsUUID(4)
  appointmentId: string;
}

export class ReadAppointmentDTO {
  appointmentId: string;
  patientId: string;
  date: Date;
  status: AppointmentStatus;
  doctorId: string;
}
