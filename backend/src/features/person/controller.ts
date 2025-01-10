import { NextFunction, Request, Response } from "express";
import { PersonService } from "@person/service";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { CreatePersonDTO, UpdatePersonDTO } from "@person/dto";
import { PrismaException } from "@common/errors/PrismaException";
import { sendSuccessResponse } from "@common/utils/sendSuccessResponse";
import { BadRequestException } from "@common/errors/BadRequestException";
import { PERSON_MODEL } from "@common/constants/modelName";
import { NotFoundException } from "@common/errors/NotFoundException";

export class PersonController {
  private personService: PersonService;

  constructor(personService: PersonService) {
    this.personService = personService;
  }

  // TODO: sending name="" is not empty, but not actual name
  async createPerson(req: Request, res: Response, next: NextFunction) {
    const personDTO = plainToInstance(CreatePersonDTO, req.body);
    const errors = await validate(personDTO);

    if (errors.length > 0) {
      next(new BadRequestException(PERSON_MODEL, errors));
    }

    try {
      const person = await this.personService.createPerson(personDTO);
      await sendSuccessResponse(res, 201, { person });
    } catch (e: any) {
      next(new PrismaException(e));
    }
  }

  async getAllPersons(req: Request, res: Response, next: NextFunction) {
    try {
      const persons = await this.personService.getAllPersons();

      if (persons.length === 0) {
        next(new NotFoundException());
      }

      await sendSuccessResponse(res, 200, { persons });
    } catch (e: any) {
      next(new PrismaException(e));
    }
  }

  async getPersonById(req: Request, res: Response, next: NextFunction) {
    const { personId } = req.params;

    try {
      const person = await this.personService.getPersonById(personId);

      if (!person) {
        next(new NotFoundException());
      }

      await sendSuccessResponse(res, 200, { person });
    } catch (e: any) {
      next(new PrismaException(e));
    }
  }

  async updatePersonInfo(req: Request, res: Response, next: NextFunction) {
    const personDTO = plainToInstance(UpdatePersonDTO, req.body);
    const errors = await validate(personDTO);

    if (errors.length > 0) {
      next(new BadRequestException(PERSON_MODEL, errors));
    }

    try {
      const person = await this.personService.updatePerson(personDTO);

      await sendSuccessResponse(res, 200, { person });
    } catch (e: any) {
      next(new PrismaException(e));
    }
  }
}
