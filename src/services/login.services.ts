import { compare } from "bcryptjs";
import { AppError } from "../errors";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../data-source";
import { iUserRepo } from "../interfaces";
import "dotenv/config";
import { iLoginRequest } from "../interfaces";
import { User } from "../entities";

const create = async (data: iLoginRequest): Promise<string> => {
  const userRepo: iUserRepo = AppDataSource.getRepository(User);

  const user: User | null = await userRepo.findOneBy({
    email: data.email,
  });

  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const verifyPassword: boolean = await compare(data.password, user.password);

  if (!verifyPassword) {
    throw new AppError("Invalid credentials", 401);
  }

  const token: string = jwt.sign(
    {
      admin: user.admin,
    },
    process.env.SECRET_KEY!,
    {
      expiresIn: String(process.env.EXPIRES_IN!),
      subject: String(user.id),
    }
  );

  return token;
};

export default { create };
