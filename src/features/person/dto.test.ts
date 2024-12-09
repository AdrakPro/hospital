import { createPersonDTO } from "@person/factory";
import { validateDto } from "@common/utils/validator";

describe("Person DTO validation", () => {
  describe("CREATE", () => {
    it("should fail if required fields are missing", async () => {
      const personDto = createPersonDTO({
        name: "",
        surname: "",
        dateOfBirth: "1980-01-01",
        phoneNumber: "",
        address: "",
        username: "",
        role: undefined,
      });

      const errors = await validateDto(personDto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].constraints).toHaveProperty("isNotEmpty");
    });

    it("should pass if all required fields are valid", async () => {
      const validPersonDto = createPersonDTO();

      const errors = await validateDto(validPersonDto);
      expect(errors.length).toBe(0);
    });

    it("should fail if role is not a valid enum", async () => {
      const personDto = createPersonDTO({
        role: "INVALID_ROLE" as any,
      });

      const errors = await validateDto(personDto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].constraints).toHaveProperty("isEnum");
    });

    it("should fail if phone number is without region code and specific length", async () => {
      const personDto = createPersonDTO({
        phoneNumber: "123458",
      });
      const errors = await validateDto(personDto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].constraints).toHaveProperty("phoneNumber");
    });
  });
});
