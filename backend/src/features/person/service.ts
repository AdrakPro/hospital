import prisma from "@db/prisma";
import { CreatePersonDTO, ReadPersonDTO, UpdatePersonDTO } from "@person/dto";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

export class PersonService {
  private db: PrismaClient;
  private readonly defaultSelect;

  // todo Add env prod/dev
  constructor(db?: PrismaClient) {
    this.db = db || prisma;

    this.defaultSelect = {
      personId: true,
      name: true,
      surname: true,
      dateOfBirth: true,
      phoneNumber: true,
      address: true,
      username: true,
      role: true,
    };
  }

  async createPerson(personDTO: CreatePersonDTO): Promise<CreatePersonDTO | null> {
    const hashedPassword = await bcrypt.hash(personDTO.password, 10);

    return this.db.person.create({
      data: {
        ...personDTO,
        password: hashedPassword,
      },
    });
  }

  async getFullPersonByUsername(username: string): Promise<ReadPersonDTO | null> {
    return this.db.person.findUnique({
      where: { username },
    });
  }

  async getPersonByUsername(username: string): Promise<ReadPersonDTO | null> {
    return this.db.person.findUnique({
      where: { username },
      select: this.defaultSelect,
    });
  }

  async getAllPersons(): Promise<ReadPersonDTO[]> {
    return prisma.person.findMany({
      select: this.defaultSelect,
    });
  }

  async getPersonById(personId: string): Promise<ReadPersonDTO | null> {
    return prisma.person.findUnique({
      where: { personId },
      select: this.defaultSelect,
    });
  }

  async updatePerson(updateData: UpdatePersonDTO): Promise<ReadPersonDTO> {
    const { personId } = updateData;

    return prisma.person.update({
      where: { personId },
      data: updateData,
    });
  }
}
