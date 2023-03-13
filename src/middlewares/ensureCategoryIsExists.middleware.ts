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
  const findCategory = await categoryRepo.findOne({
    where: {
      id: Number(req.params.id),
    },
  });
  if (!findCategory) {
    throw new AppError("Category not found", 404);
  }

  return next();
};

export default { verify };
