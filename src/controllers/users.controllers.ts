import { Request, Response } from "express";
import { iUser, iUserUpdate } from "../interfaces";
import { usersServices } from "../services";

const create = async (req: Request, res: Response): Promise<Response> => {
  const data: iUser = req.body;

  const newUser = await usersServices.create(data);
  return res.status(201).json(newUser);
};

const read = async (req: Request, res: Response): Promise<Response> => {
  const allUsers = await usersServices.read();
  return res.status(200).json(allUsers);
};

const update = async (req: Request, res: Response): Promise<Response> => {
  const user: iUserUpdate = req.body;
  const id: number = Number(req.params.id);

  const userUpdate = await usersServices.update(user, id);

  return res.json(userUpdate);
};

const del = async (req: Request, res: Response): Promise<Response> => {
  const deleteUser = await usersServices.del(Number(req.params.id));
  return res.status(204).send();
};

export default { create, read, update, del };
