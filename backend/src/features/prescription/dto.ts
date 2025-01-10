import {
  ArrayNotEmpty,
  IsArray,
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
  @IsOptional()
  @IsString()
  notes?: string;

  @IsNotEmpty()
  @IsUUID(4)
  appointmentId: string;
}

export class UpdatePrescriptionDTO {
  @IsNotEmpty()
  @IsUUID(4)
  prescriptionId: string;

  @IsNotEmpty()
  @IsEnum(PrescriptionStatus)
  status: PrescriptionStatus;
}

export class DeletePrescriptionDTO {
  @IsNotEmpty()
  @IsUUID(4)
  prescriptionId: string;
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
