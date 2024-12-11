import { vi } from "vitest";
import { PersonService } from "@person/service";
import prismaMock from "@db/__mocks__/prisma";
import { createPersonFactory } from "@person/tests/factory";
import bcrypt from "bcryptjs";

vi.mock("bcryptjs", () => ({
  default: {
    hash: vi.fn().mockResolvedValue("mockedHash"),
  },
}));

describe("Person Service", () => {
  let service: PersonService;

  beforeAll(() => {
    service = new PersonService(prismaMock);
  });

  describe("CREATE", () => {
    it("should create a new person successfully", async () => {
      const person = createPersonFactory();
      const passwordMock = "mockedHash";
      // @ts-ignore (ts bug with hash)
      vi.spyOn(bcrypt, "hash").mockResolvedValue(passwordMock);

      prismaMock.person.create.mockResolvedValue({
        personId: "uuid123",
        ...person,
        password: passwordMock,
      });

      const result = await service.createPerson(person);

      expect(result).toMatchObject({
        personId: "uuid123",
        ...person,
        password: passwordMock,
      });

      expect(prismaMock.person.create).toHaveBeenCalledWith({
        data: {
          ...person,
          password: passwordMock,
        },
      });
    });
  });
});
