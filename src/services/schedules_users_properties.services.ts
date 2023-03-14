import { AppDataSource } from "../data-source";
import { RealEstate, Schedule, User } from "../entities";
import { AppError } from "../errors";
import { iUserRepo } from "../interfaces";
import { iRealEstateRepo, iRealEstateReturn } from "../interfaces";
import { iSchedules, iSchedulesRepo } from "../interfaces/";

const create = async (data: iSchedules, userdId: number): Promise<object> => {
  const scheduleRepo: iSchedulesRepo = AppDataSource.getRepository(Schedule);
  const userRepo: iUserRepo = AppDataSource.getRepository(User);
  const realEstateRepo: iRealEstateRepo =
    AppDataSource.getRepository(RealEstate);
  const scheduleBuilder = await scheduleRepo
    .createQueryBuilder("schedule")
    .where("schedule.realEstateId = :realEstateId", {
      realEstateId: data.realEstateId,
    })
    .andWhere("schedule.date = :date", { date: data.date })
    .andWhere("schedule.hour = :hour", { hour: data.hour })
    .getOne();
  if (scheduleBuilder) {
    throw new AppError(
      "Schedule to this real estate at this date and time already exists",
      409
    );
  }

  if (data.hour < "08:00" || data.hour > "18:00") {
    throw new AppError("Invalid hour, available times are 8AM to 18PM");
  }

  const newDate = new Date(data.date);
  const weekDay = newDate.getDay();
  
  if (weekDay === 0 || weekDay === 6) {
    throw new AppError("Invalid date, work days are monday to friday", 400);
  }
  const findRealEstate: RealEstate | null = await realEstateRepo.findOneBy({
    id: data.realEstateId,
  });

  if (!findRealEstate) {
    throw new AppError("RealEstate not found", 404);
  }
  const findSchedule = await scheduleRepo.findOneBy({
    date: data.date,
    hour: data.hour,
  });
  if (findSchedule) {
    throw new AppError(
      "User schedule to this real estate at this date and time already exists",
      409
    );
  }
  const findUser: User | null = await userRepo.findOneBy({
    id: userdId,
  });
  const newSchedule: Schedule = scheduleRepo.create({
    ...data,
    realEstate: findRealEstate,
    user: findUser!,
  });
  await scheduleRepo.save(newSchedule);

  return newSchedule;
};

const read = async (realEstate: number): Promise<iRealEstateReturn> => {
  const realEstateRepo: iRealEstateRepo =
    AppDataSource.getRepository(RealEstate);

  const findRealEstate: RealEstate | null = await realEstateRepo.findOne({
    where: {
      id: realEstate,
    },
    relations: {
      address: true,
      category: true,
      schedules: {
        user: true,
      },
    },
  });

  if (!findRealEstate) {
    throw new AppError("RealEstate not found", 404);
  }

  return findRealEstate;
};

export default { create, read };
