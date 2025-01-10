import {
  IsDateString,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";
import { PersonRole } from "@prisma/client";
import { IsNonNumericString } from "@common/validators/isNonNumericString";

export class CreatePersonDTO {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @Matches(/^[a-zA-Z\s]+$/, { message: "Name must contain only letters and spaces" })
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @Matches(/^[a-zA-Z\s]+$/, { message: "Surname must contain only letters and spaces" })
  surname: string;

  @IsNotEmpty()
  @IsDateString()
  dateOfBirth: Date;

  @IsNotEmpty()
  @IsNumberString()
  @MinLength(11)
  @MaxLength(11)
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 32)
  password: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  address: string;

  @IsNotEmpty()
  @IsString()
  @Length(4, 25)
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
  @IsNonNumericString()
  name?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @IsNonNumericString()
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
