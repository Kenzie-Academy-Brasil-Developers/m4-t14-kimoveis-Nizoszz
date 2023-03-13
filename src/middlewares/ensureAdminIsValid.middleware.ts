import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors";

const verify = async (
  req: Request,
  resp: Response,
  next: NextFunction
): Promise<Response | void> => {
  const authentication = req.user.admin;

  if (authentication === false) {
    throw new AppError("Insufficient permission", 403);
  }

  return next();
};

export default { verify };
