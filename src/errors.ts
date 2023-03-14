import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

class AppError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}

const handleErrors = (
  Error: any,
  req: Request,
  res: Response,
  _: NextFunction
) => {
  if (Error instanceof AppError) {
    return res.status(Error.statusCode).json({
      message: Error.message,
    });
  }

  if (Error instanceof ZodError) {
    return res.status(400).json({ message: Error.flatten().fieldErrors });
  }

  return res.status(500).json({
    message: "Internal server error",
  });
};

export { AppError, handleErrors };
