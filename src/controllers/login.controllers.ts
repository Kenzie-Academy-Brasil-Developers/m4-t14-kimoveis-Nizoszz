import { Request, Response } from "express";
import { iLoginRequest } from "../interfaces";
import { loginService } from "../services";

const create = async (req: Request, res: Response): Promise<Response> => {
  const data: iLoginRequest = req.body;
  const token = await loginService.create(data);

  return res.json({ token: token });
};

export default { create };
