import { Request, Response } from "express";
import { PersonService } from "@person/service";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { CreatePersonDTO } from "@person/dto";

export class PersonController {
  private personService: PersonService;

  constructor(personService: PersonService) {
    this.personService = personService;
  }

  // TODO: sending name="" is not empty, but not actual name
  async createPerson(req: Request, res: Response) {
    let transformedPerson = plainToInstance(CreatePersonDTO, req.query);

    const errors = await validate(transformedPerson);

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    try {
      const person = await this.personService.createPerson(transformedPerson);
      return res.status(201).json(person);
    } catch (e: any) {
      return res.status(500).json({ message: e.message });
    }
  }
}
