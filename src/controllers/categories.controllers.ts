import { Request, Response } from "express";
import { iCategory } from "../interfaces";
import { categoriesServices } from "../services";

const create = async (req: Request, res: Response): Promise<Response> => {
  const data: iCategory = req.body;

  const newCategory = await categoriesServices.create(data);
  return res.status(201).json(newCategory);
};

const read = async (req: Request, res: Response): Promise<Response> => {
  const categories = await categoriesServices.read();
  return res.status(200).json(categories);
};

const readIdRealEstate = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const category: number = Number(req.params.id);

  const realEstateCategories = await categoriesServices.readIdRealEstate(
    category
  );

  return res.json(realEstateCategories);
};

export default { create, read, readIdRealEstate };
