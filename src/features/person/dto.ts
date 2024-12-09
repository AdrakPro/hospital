import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
} from "class-validator";
import { PersonRole } from "@person/model";

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
  dateOfBirth: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  phoneNumber: string;

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
  role?: PersonRole;
}
