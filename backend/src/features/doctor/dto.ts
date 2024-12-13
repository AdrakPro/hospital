import {
  IsMilitaryTime,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";

export class CreateDoctorDTO {
  @IsNotEmpty()
  @IsUUID("4")
  personId: string;

  @IsNotEmpty()
  @IsOptional()
  @IsUUID("4")
  departmentId?: string;

  @IsNotEmpty()
  @IsString()
  specialization: string;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  room?: string;

  @IsNotEmpty()
  @IsMilitaryTime()
  workStart: string;

  @IsNotEmpty()
  @IsMilitaryTime()
  workEnd: string;
}

export class UpdateDoctorDTO {
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  departmentId?: string;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  specialization?: string;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  room?: string;

  @IsNotEmpty()
  @IsOptional()
  @IsMilitaryTime()
  workStart?: string;

  @IsNotEmpty()
  @IsOptional()
  @IsMilitaryTime()
  workEnd?: string;
}

export class DeleteDoctorDTO {
  @IsNotEmpty()
  @IsString()
  doctorId: string;
}

export class ReadDoctorDTO {
  doctorId: string;
  personId: string;
  departmentId: string | null;
  specialization: string;
  room: string | null;
  workStart: string;
  workEnd: string;
}
