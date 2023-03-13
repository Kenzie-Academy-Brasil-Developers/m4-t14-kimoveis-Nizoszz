import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors";

const verify = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const userId: number = Number(req.params.id);
  const { admin, id } = req.user;

  if (!admin) {
    if (userId !== id) {
      throw new AppError("Insufficient permission", 403);
    }
    const { admin, ...payload } = req.body;

    req.body = {
      ...payload,
    };
  }

  return next();
};

export default { verify };
