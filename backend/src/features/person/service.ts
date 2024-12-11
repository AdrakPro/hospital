import prisma from "@db/prisma";
import { CreatePersonDTO } from "@person/dto";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

export class PersonService {
  private db: PrismaClient;

  // todo Add env prod/dev
  constructor(db?: PrismaClient) {
    this.db = db || prisma;
  }

  async createPerson(personDTO: CreatePersonDTO) {
    const hashedPassword = await bcrypt.hash(personDTO.password, 10);

    return this.db.person.create({
      data: {
        ...personDTO,
        password: hashedPassword,
      },
    });
  }

  async readPerson(username: string) {
    return this.db.person.findUnique({ where: { username } });
  }
}
