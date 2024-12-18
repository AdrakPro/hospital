import { IsNotEmpty, IsString, Length } from "class-validator";

export class LoginDTO {
  @IsNotEmpty()
  @IsString()
  @Length(5, 25)
  username: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 32)
  password: string;
}
