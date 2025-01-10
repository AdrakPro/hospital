import { IsInt, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateDepartmentDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  bedCount: number;

  @IsNotEmpty()
  @IsInt()
  patientCount: number;

  @IsNotEmpty()
  @IsInt()
  doctorCount: number;

  @IsNotEmpty()
  @IsUUID(4)
  directorId: string;
}

export class UpdateDepartmentDTO {
  @IsNotEmpty()
  @IsUUID(4)
  departmentId: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  bedCount?: number;
}

export class DepartmentDoctorDTO {
  @IsNotEmpty()
  @IsUUID(4)
  departmentId: string;

  @IsNotEmpty()
  @IsUUID(4)
  doctorId: string;
}

export class DepartmentPatientDTO {
  @IsNotEmpty()
  @IsUUID(4)
  departmentId: string;

  @IsNotEmpty()
  @IsUUID(4)
  patientId: string;
}

export class DepartmentTransferPatientDTO {
  @IsNotEmpty()
  @IsUUID(4)
  newDepartmentId: string;

  @IsNotEmpty()
  @IsUUID(4)
  oldDepartmentId: string;

  @IsNotEmpty()
  @IsUUID(4)
  patientId: string;
}

export class DeleteDepartmentDTO {
  @IsNotEmpty()
  @IsUUID(4)
  departmentId: string;
}

export class ReadDepartmentDTO {
  departmentId: string;
  name: string;
  bedCount: number;
  patientCount: number;
  doctorCount: number;
  directorId: string;
}
