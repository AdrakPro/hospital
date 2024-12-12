import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from "class-validator";
import { PersonRole } from "@prisma/client";

export class CreatePersonDTO {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  surname: string;

  @IsNotEmpty()
  @IsDateString()
  dateOfBirth: Date;

  @IsNotEmpty()
  @IsNumberString()
  @MinLength(11)
  @MaxLength(11)
  phoneNumber: string;

  @IsString()
  @Length(8, 32)
  password: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  address: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(25)
  username: string;

  @IsEnum(PersonRole)
  @IsOptional()
  role: PersonRole | null;
}

export class ReadPersonDTO {
  personId: string;
  name: string;
  surname: string;
  dateOfBirth: Date;
  phoneNumber: string;
  address: string;
  username: string;
  role: PersonRole | null;
}

export class UpdatePersonDTO {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  name?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  surname?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsDateString()
  dateOfBirth?: Date;

  @IsOptional()
  @IsNotEmpty()
  @IsNumberString()
  @Length(11, 11)
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  @Length(8, 32)
  password?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  address?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(25)
  username?: string;

  @IsOptional()
  @IsEnum(PersonRole)
  @IsOptional()
  role?: PersonRole | null;
}
