import { IsString, IsOptional, IsDate, IsArray } from "class-validator";

export class PatientDto {
  @IsString()
  patientId: string;

  @IsString()
  personId: string;

  @IsDate()
  dateOfAdmission: Date;

  @IsOptional()
  @IsDate()
  dateOfDischarge?: Date;

  @IsString()
  policyNumber: string;

  @IsArray()
  @IsString({ each: true })
  conditions: string[];

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsString()
  departmentId?: string;
}
