import bcrypt from "bcryptjs";
import * as jose from "jose";
import { ReadPersonDTO } from "@person/dto";

const SECRET = new TextEncoder().encode("YOUR_SECRET_KEY");
const ALGORITHM = "HS256";
const EXPIRATION_TIME = "2h";

class AuthService {
  async login(person: ReadPersonDTO | null, password: string) {
    if (person?.password === undefined) {
      return { isValid: false };
    }

    const match = await bcrypt.compare(password, person.password);

    if (!match) {
      return { isValid: false, jwt: null };
    }

    const jwt = await new jose.SignJWT({
      user: { id: person.personId, username: person.username },
    })
      .setProtectedHeader({ alg: ALGORITHM })
      .setIssuedAt()
      .setExpirationTime(EXPIRATION_TIME)
      .sign(SECRET);
    return { isValid: true, jwt };
  }

  async verifyToken(jwt: string) {
    try {
      const { payload } = await jose.jwtVerify(jwt, SECRET);
      return { isValid: true, payload };
    } catch (error) {
      return { isValid: false, payload: null };
    }
  }
}

export default AuthService;
