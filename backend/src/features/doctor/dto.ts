import {
  IsDate,
  IsDateString,
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
  @IsDateString()
  workStart: Date;

  @IsNotEmpty()
  @IsDateString()
  workEnd: Date;
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
  @IsDateString()
  workStart?: Date;

  @IsNotEmpty()
  @IsOptional()
  @IsDateString()
  workEnd?: Date;
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
  workStart: Date;
  workEnd: Date;
}
