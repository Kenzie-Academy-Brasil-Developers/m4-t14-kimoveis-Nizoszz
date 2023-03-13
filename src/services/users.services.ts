import { AppDataSource } from "../data-source";
import { User } from "../entities";
import {
  iAllUsersReturn,
  iUser,
  iUserRepo,
  iUserReturn,
  iUserUpdate,
} from "../interfaces";
import { returnUserSchema } from "../schemas";
import { returnAllUsersSchema } from "../schemas";

const create = async (data: iUser): Promise<iUserReturn> => {
  const userRepo: iUserRepo = AppDataSource.getRepository(User);

  const user: User = userRepo.create(data);

  await userRepo.save(user);

  const newUser = returnUserSchema.parse(user);

  return newUser;
};

const read = async (): Promise<iAllUsersReturn> => {
  const userRepo: iUserRepo = AppDataSource.getRepository(User);
  const findUsers: User[] = await userRepo.find({ withDeleted: true });

  const users = returnAllUsersSchema.parse(findUsers);

  return users;
};

const update = async (data: iUserUpdate, id: number): Promise<iUserReturn> => {
  const userRepo: iUserRepo = AppDataSource.getRepository(User);

  const findUser: User | null = await userRepo.findOneBy({
    id: id,
  });

  const userUpdate = userRepo.create({
    ...findUser,
    ...data,
  });

  await userRepo.save(userUpdate);

  const update = returnUserSchema.parse(userUpdate);

  return update;
};

const del = async (idUser: number): Promise<void> => {
  const userRepo: iUserRepo = AppDataSource.getRepository(User);

  const user = await userRepo.findOne({
    where: {
      id: idUser,
    },
  });

  await userRepo.softRemove(user!);
};

export default { create, read, update, del };
