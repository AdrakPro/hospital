import { Mock, vi } from "vitest";
import { Request, Response } from "express";
import { PersonService } from "@person/service";
import { PersonController } from "@person/controller";
import { plainToInstance } from "class-transformer";
import { CreatePersonDTO } from "@person/dto";

const createMockResponse = () => {
  return {
    status: vi.fn().mockReturnThis(),
    json: vi.fn(),
  } as Partial<Response> as Response;
};

const createMockRequest = (valid = true) => {
  return {
    query: {
      name: valid ? "John Doe" : undefined,
      surname: "Doe",
      dateOfBirth: "1990-01-01T00:00:00.000Z",
      phoneNumber: "12345678901",
      password: "securepassword123",
      address: "123 Main St",
      username: "johndoe123",
      role: "PATIENT",
    },
  } as Partial<Request> as Request;
};

describe("PersonController", () => {
  let personController: PersonController;
  let personService: PersonService;

  beforeEach(() => {
    personService = {
      createPerson: vi.fn(),
    } as any as PersonService;

    personController = new PersonController(personService);
  });

  it("should return 400 when validation fails", async () => {
    const req = createMockRequest(false);
    const res = createMockResponse();

    await personController.createPerson(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      errors: expect.arrayContaining([
        expect.objectContaining({
          property: "name",
          constraints: expect.objectContaining({
            isNotEmpty: expect.any(String),
          }),
        }),
      ]),
    });
  });

  it("should return 201 when person is created successfully", async () => {
    const req = createMockRequest(true);
    const res = createMockResponse();

    (personService.createPerson as Mock).mockResolvedValue(req.query);

    await personController.createPerson(req, res);

    expect(personService.createPerson).toHaveBeenCalledWith(
      plainToInstance(CreatePersonDTO, req.query),
    );
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(req.query);
  });

  it("should return 500 when service throws an error", async () => {
    const req = createMockRequest();
    const res = createMockResponse();

    const error = new Error("Service error");
    (personService.createPerson as Mock).mockRejectedValue(error);

    await personController.createPerson(req, res);

    expect(personService.createPerson).toHaveBeenCalledWith(
      plainToInstance(CreatePersonDTO, req.query),
    );
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: error.message });
  });
});
