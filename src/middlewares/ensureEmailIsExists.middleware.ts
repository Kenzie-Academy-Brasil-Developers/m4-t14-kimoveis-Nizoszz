import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities";
import { AppError } from "../errors";
import { iUserRepo } from "../interfaces";

const verify = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userRepo: iUserRepo = AppDataSource.getRepository(User);
  const findUser = await userRepo.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (findUser) {
    throw new AppError("Email already exists", 409);
  }

  return next();
};

export default { verify };
