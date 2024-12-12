import { IsInt, IsNotEmpty, IsString, IsUUID } from "class-validator";

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
  doctorsCount: number;

  @IsNotEmpty()
  @IsUUID()
  directorId: string;
}

export class UpdateDepartmentDTO {
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
  doctorsCount: number;

  @IsNotEmpty()
  @IsUUID()
  directorId: string;
}

export class DeleteDepartmentDTO {
  @IsNotEmpty()
  @IsUUID()
  departmentId: string;
}

export class ReadDepartmentDTO {
  departmentId: string;
  name: string;
  bedCount: number;
  patientCount: number;
  doctorsCount: number;
  directorId: string;
}
