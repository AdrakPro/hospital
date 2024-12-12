import {
  IsString,
  IsOptional,
  IsDate,
  IsArray,
  IsNotEmpty,
  IsDateString,
  IsUUID,
} from "class-validator";

export class CreatePatientDTO {
  @IsNotEmpty()
  @IsUUID("4")
  personId: string;

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
  @IsUUID("4")
  departmentId?: string;
}

export class UpdatePatientDTO {
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
  @IsUUID("4")
  departmentId?: string;
}

export class DeletePatientDTO {
  @IsNotEmpty()
  @IsString()
  patientId: string;
}

export class ReadPatientDTO {
  patientId: string;
  personId: string;
  dateOfAdmission: Date;
  dateOfDischarge: Date | null;
  policyNumber: string;
  conditions: string[];
  notes: string | null;
  departmentId: string | null;
}
