import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { LoginDTO } from "@auth/dto";
import prisma from "@db/prisma";
import { AuthException } from "@common/errors/AuthException";

const JWT_SECRET = process.env.JWT_SECRET || "mega";
const JWT_EXPIRATION = "1h";

class AuthService {
  async login(loginDto: LoginDTO) {
    const { username, password } = loginDto;

    const person = await prisma.person.findUnique({ where: { username } });

    if (!person) {
      throw new AuthException("Invalid username or password.");
    }

    const isPasswordValid = await bcrypt.compare(password, person.password);

    if (!isPasswordValid) {
      throw new AuthException("Invalid username or password.");
    }

    const payload = {
      personId: person.personId,
      role: person.role,
    };

    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRATION,
    });

    return { token, role: person.role, personId: person.personId };
  }
}

export default AuthService;
