import { Repository } from "typeorm";
import { z } from "zod";
import { Schedule } from "../entities";
import {
  createSchedulesSchema,
  returnAllSchedulesSchema,
  returnSchedulesSchema,
} from "../schemas";

type iSchedules = z.infer<typeof createSchedulesSchema>;
type iSchedulesReturn = z.infer<typeof returnSchedulesSchema>;
type iSchedulesAllReturn = z.infer<typeof returnAllSchedulesSchema>;

type iSchedulesRepo = Repository<Schedule>;

export { iSchedules, iSchedulesReturn, iSchedulesRepo, iSchedulesAllReturn };
