import bcrypt from "bcryptjs";

export const hashPassword = (password: string, salt_rounds = 3) => {
  const salt = bcrypt.genSaltSync(salt_rounds);
  return bcrypt.hash(password, salt);
};
