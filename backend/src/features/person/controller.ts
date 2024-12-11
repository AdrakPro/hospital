import { NextFunction, Request, Response } from "express";
import { PersonService } from "@person/service";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { CreatePersonDTO } from "@person/dto";
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
      next(
        new HttpException(
          "Required fields are missing or invalid.",
          ErrorCode.BAD_REQUEST,
          errors,
        ),
      );
    }

    try {
      const fetchedPerson = await this.personService.readPerson(
        transformedPerson.username,
      );

      if (fetchedPerson) {
        next(
          new HttpException(
            "Duplicate entry detected. The resource already exists.",
            ErrorCode.CONFLICT,
          ),
        );

        return null;
      }

      const person = await this.personService.createPerson(transformedPerson);
      res.status(201).json({ person });
    } catch (e: any) {
      next(
        new HttpException(
          "An unexpected error occurred on the server.",
          ErrorCode.INTERNAL_SERVER_ERROR,
        ),
      );
    }
  }
}
