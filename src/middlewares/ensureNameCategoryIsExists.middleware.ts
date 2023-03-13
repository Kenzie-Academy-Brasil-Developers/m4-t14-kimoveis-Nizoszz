import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Category } from "../entities";
import { AppError } from "../errors";
import { iCategoryRepo } from "../interfaces";

const verify = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const categoryRepo: iCategoryRepo = AppDataSource.getRepository(Category);
  const findUser = await categoryRepo.findOne({
    where: {
      name: req.body.name,
    },
  });
  if (findUser) {
    throw new AppError("Category already exists", 409);
  }

  return next();
};

export default { verify };
