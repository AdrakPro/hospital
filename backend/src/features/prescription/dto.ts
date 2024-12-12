import {
  ArrayNotEmpty,
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";
import { PrescriptionStatus } from "@prisma/client";

export class CreatePrescriptionDTO {
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  drugs: string[];

  @IsNotEmpty()
  @IsDateString()
  issue: Date;

  @IsNotEmpty()
  @IsDateString()
  expiration: Date;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsUUID("4")
  appointmentId: string;
}

export class UpdatePrescriptionDTO {
  @IsNotEmpty()
  @IsEnum(PrescriptionStatus)
  status: PrescriptionStatus;
}

export class ReadPrescriptionDTO {
  prescriptionId: string;
  drugs: string[];
  issue: Date;
  expiration: Date;
  status: PrescriptionStatus;
  notes: string | null;
  appointmentId: string;
}

export class DeletePrescriptionDTO {
  @IsNotEmpty()
  @IsUUID("4")
  prescriptionId: string;
}
