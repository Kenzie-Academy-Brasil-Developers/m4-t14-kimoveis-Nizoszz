import { Request, Response } from "express";
import { iSchedules } from "../interfaces";
import { schedules_users_propertiesServices } from "../services";

const create = async (req: Request, res: Response) => {
  const data: iSchedules = req.body;
  const userId: number = req.user.id;

  const schedules = await schedules_users_propertiesServices.create(
    data,
    userId
  );

  return res.status(201).json({ message: "Schedule created" });
};

const read = async (req: Request, res: Response) => {
  const realEstateId: number = Number(req.params.id);

  const allSchedules = await schedules_users_propertiesServices.read(
    realEstateId
  );

  return res.json(allSchedules);
};

export default { create, read };
