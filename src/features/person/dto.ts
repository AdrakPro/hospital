import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
  MaxLength,
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
  @Length(11, 11)
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
