import { IsMilitaryTime, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { IsValidPerson } from "@common/validators/personValidator";
import { CreatePersonDTO } from "@person/dto";

export class CreateDoctorDTO {
  @IsValidPerson()
  person: CreatePersonDTO;

  @IsNotEmpty()
  @IsOptional()
  @IsUUID(4)
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
  @IsUUID(4)
  doctorId: string;

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
