import { NextFunction, Request, Response } from "express";
import { PersonService } from "@person/service";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { CreatePersonDTO, UpdatePersonDTO } from "@person/dto";
import { ErrorCode, HttpException } from "@common/errors/HttpException";

export class PersonController {
  private personService: PersonService;

  constructor(personService: PersonService) {
    this.personService = personService;
  }

  // TODO: sending name="" is not empty, but not actual name
  async createPerson(req: Request, res: Response, next: NextFunction) {
    const transformedPerson = plainToInstance(CreatePersonDTO, req.query);
    const errors = await validate(transformedPerson);

    if (errors.length > 0) {
      next(new HttpException(ErrorCode.BAD_REQUEST, undefined, errors));
    }

    try {
      const fetchedPerson = await this.personService.getPersonByUsername(
        transformedPerson.username,
      );

      if (fetchedPerson) {
        next(new HttpException(ErrorCode.CONFLICT));

        return null;
      }

      const person = await this.personService.createPerson(transformedPerson);
      res.status(201).json({ person });
    } catch (e: any) {
      next(new HttpException(ErrorCode.INTERNAL_SERVER_ERROR));
    }
  }

  async getPerson(req: Request, res: Response, next: NextFunction) {
    try {
      const { personId } = req.params;
      const fetchedPerson = await this.personService.getPersonById(personId);
      console.log(fetchedPerson);
      if (!fetchedPerson) {
        next(new HttpException(ErrorCode.NOT_FOUND));
      }

      res.status(200).json(fetchedPerson);
    } catch (e: any) {
      next(new HttpException(ErrorCode.INTERNAL_SERVER_ERROR, e.message));
    }
  }

  async updatePersonInfo(req: Request, res: Response, next: NextFunction) {
    const transformedPerson = plainToInstance(UpdatePersonDTO, req.body);
    const errors = await validate(transformedPerson); // tu error

    if (errors.length > 0) {
      next(new HttpException(ErrorCode.BAD_REQUEST, undefined, errors));
    }

    const { personId } = req.params;

    // Prevent updating username, password and role (todo its temporary, block on validate level)
    const { username, password, role, ...sanitizedData } = transformedPerson;
    try {
      await this.personService.updatePerson(personId, sanitizedData);

      res.status(200).json(sanitizedData);
    } catch (e: any) {
      next(new HttpException(ErrorCode.INTERNAL_SERVER_ERROR, e.message));
    }
  }
}