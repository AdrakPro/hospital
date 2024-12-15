import { Meta } from "@common/types/meta";

export class HttpException extends Error {
  statusCode: number;
  meta?: Meta | Meta[];


  constructor(message: string, statusCode: number, meta?: Meta | Meta[]) {
    super(message);
    this.statusCode = statusCode;
    this.meta = meta;
  }
}
