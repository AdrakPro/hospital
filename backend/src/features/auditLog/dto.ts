import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
} from "class-validator";
import { AuditAction } from "@prisma/client";

export class CreateAuditLogDTO {
  @IsNotEmpty()
  @IsUUID()
  personId: string;

  @IsNotEmpty()
  @IsDateString()
  timestamp: Date;

  @IsNotEmpty()
  @IsEnum(AuditAction)
  action: AuditAction;

  @IsNotEmpty()
  @IsString()
  log: string;
}

export class DeleteAuditLogDTO {
  @IsNotEmpty()
  @IsUUID()
  logId: string;
}

export class ReadAuditLogDTO {
  logId: string;
  personId: string;
  timestamp: Date;
  action: AuditAction;
  log: string;
}
