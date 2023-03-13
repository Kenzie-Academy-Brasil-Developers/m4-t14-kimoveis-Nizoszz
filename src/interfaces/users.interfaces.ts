import {
  createUserSchema,
  returnUserSchema,
  returnAllUsersSchema,
} from "../schemas";
import { z } from "zod";
import { DeepPartial, Repository } from "typeorm";
import { User } from "../entities";

type iUser = z.infer<typeof createUserSchema>;
type iUserReturn = z.infer<typeof returnUserSchema>;
type iAllUsersReturn = z.infer<typeof returnAllUsersSchema>;
type iUserUpdate = DeepPartial<iUser>;

type iUserRepo = Repository<User>;

export { iUser, iUserReturn, iUserRepo, iAllUsersReturn, iUserUpdate };
