import { IsEnum, IsNotEmpty, IsString, IsUUID } from "class-validator";
import { AuditAction } from "@prisma/client";

export class CreateAuditLogDTO {
  @IsNotEmpty()
  @IsUUID(4)
  personId: string;

  @IsNotEmpty()
  @IsEnum(AuditAction)
  action: AuditAction;

  @IsNotEmpty()
  @IsString()
  model: string;

  @IsNotEmpty()
  @IsString()
  log: string;
}

export class DeleteAuditLogDTO {
  @IsNotEmpty()
  @IsUUID(4)
  personId: string;
}

export class ReadAuditLogDTO {
  logId: string;
  personId: string;
  model: string;
  createdAt: Date;
  action: AuditAction;
  log: string;
}
