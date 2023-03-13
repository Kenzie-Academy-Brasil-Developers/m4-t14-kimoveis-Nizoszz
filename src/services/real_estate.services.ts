import { AppDataSource } from "../data-source";
import { Address, Category, RealEstate } from "../entities";
import { AppError } from "../errors";
import { iCategoryRepo, iRealEstate, iRealEstateReturn } from "../interfaces";
import { iAddressRepo } from "../interfaces";
import {
  iAllRealEstateReturn,
  iRealEstateRepo,
} from "../interfaces/real_estate.interfaces";
import {
  returnAllRealEstateSchema,
  returnRealEstateSchema,
} from "../schemas";

const create = async (data: iRealEstate): Promise<iRealEstateReturn> => {
  const addressesRepo: iAddressRepo = AppDataSource.getRepository(Address);
  const addAddress: Address = addressesRepo.create(data.address);
  const findAddress = await addressesRepo.findOneBy({
    street: String(addAddress.street),
    number: String(addAddress.number),
  });
  if (findAddress) {
    throw new AppError("Address already exists", 409);
  }
  await addressesRepo.save(addAddress);
  const categoryRepo: iCategoryRepo = AppDataSource.getRepository(Category);
  const findCategory = await categoryRepo.findOneBy({
    id: Number(data.categoryId),
  });
  if (!findCategory) {
    throw new AppError("Category not found", 404);
  }
  const realEstateRepo: iRealEstateRepo =
    AppDataSource.getRepository(RealEstate);
  const realEstate = realEstateRepo.create({
    ...data,
    address: addAddress,
    category: findCategory,
  });
  await realEstateRepo.save(realEstate);

  const newRealEstate = returnRealEstateSchema.parse(realEstate);
  return newRealEstate;
};

const read = async (): Promise<iAllRealEstateReturn> => {
  const realEstateRepo: iRealEstateRepo =
    AppDataSource.getRepository(RealEstate);
  const findRealEstate: RealEstate[] = await realEstateRepo.find({
    relations: {
      address: true,
      category: true,
    },
  });

  const allRealEstate = returnAllRealEstateSchema.parse(findRealEstate);

  return allRealEstate;
};
export default { create, read };
