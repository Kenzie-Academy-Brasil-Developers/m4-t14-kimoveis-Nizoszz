import { Request, Response } from "express";
import { iRealEstate } from "../interfaces";
import { real_estateServices } from "../services";

const create = async (req: Request, res: Response): Promise<Response> => {
  const data: iRealEstate = req.body;

  const newRealEstate = await real_estateServices.create(data);

  return res.status(201).json(newRealEstate);
};

const read = async (req: Request, res: Response): Promise<Response> => {
  const allRealEstate = await real_estateServices.read();
  return res.json(allRealEstate);
};

export default { create, read };
