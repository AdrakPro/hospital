import {
  IsDateString,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
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
}

export class UpdatePersonDTO {
  @IsNotEmpty()
  @IsUUID(4)
  personId: string;

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
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  address?: string;
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
  password?: string;
}
