import { createPersonFactory } from "@person/tests/factory";
import { validateDTO } from "@common/utils/validator";

describe("Person DTO validation", () => {
  describe("CREATE", () => {
    it("should fail if required fields are missing", async () => {
      const personDto = createPersonFactory({
        name: "",
        surname: "",
        dateOfBirth: new Date("1980-01-01"),
        phoneNumber: "",
        address: "",
        username: "",
        role: undefined,
      });

      const errors = await validateDTO(personDto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].constraints).toHaveProperty("isNotEmpty");
    });

    it("should pass if all required fields are valid", async () => {
      const validPersonDto = createPersonFactory();

      const errors = await validateDTO(validPersonDto);
      expect(errors.length).toBe(0);
    });

    it("should fail if role is not a valid enum", async () => {
      const personDto = createPersonFactory({
        role: "INVALID_ROLE" as any,
      });

      const errors = await validateDTO(personDto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].constraints).toHaveProperty("isEnum");
    });

    it("should fail if phone number is without region code and specific length", async () => {
      const personDto = createPersonFactory({
        phoneNumber: "123458",
      });

      const errors = await validateDTO(personDto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].constraints).toHaveProperty("isPhoneNumber");
    });
  });
});
