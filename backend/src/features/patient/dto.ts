import { IsArray, IsDateString, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { IsValidPerson } from "@common/validators/personValidator";
import { CreatePersonDTO } from "@person/dto";

export class CreatePatientDTO {
  @IsValidPerson()
  person: CreatePersonDTO;

  @IsNotEmpty()
  @IsDateString()
  dateOfAdmission: Date;

  @IsNotEmpty()
  @IsOptional()
  @IsDateString()
  dateOfDischarge?: Date;

  @IsNotEmpty()
  @IsString()
  policyNumber: string;

  @IsArray()
  @IsString({ each: true })
  conditions: string[];

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  notes?: string;

  @IsNotEmpty()
  @IsOptional()
  @IsUUID(4)
  departmentId?: string;
}

export class UpdatePatientDTO {
  @IsNotEmpty()
  @IsUUID(4)
  patientId: string;

  @IsNotEmpty()
  @IsOptional()
  @IsDateString()
  dateOfDischarge?: Date;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  policyNumber?: string;

  @IsNotEmpty()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  conditions?: string[];

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  notes?: string;

  @IsNotEmpty()
  @IsOptional()
  @IsUUID(4)
  departmentId?: string;
}

export class DeletePatientDTO {
  @IsNotEmpty()
  @IsString()
  patientId: string;
}

export class ReadPatientDTO {
  patientId: string;
  dateOfAdmission: Date;
  dateOfDischarge: Date | null;
  policyNumber: string;
  conditions: string[];
  notes: string | null;
  departmentId: string | null;
}
