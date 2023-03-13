import { AppDataSource } from "../data-source";
import { Category, RealEstate } from "../entities";
import {
  iCategory,
  iCategoryRepo,
  iCategoryReturn,
  iRealEstateRepo,
} from "../interfaces";
import { iAllCategoryReturn } from "../interfaces";
import {
  returnAllCategoriesSchema,
  returnCategorySchema,
} from "../schemas";

const create = async (data: iCategory): Promise<iCategoryReturn> => {
  const categoryRepo: iCategoryRepo = AppDataSource.getRepository(Category);

  const category: Category = categoryRepo.create(data);

  await categoryRepo.save(category);

  const newcategory = returnCategorySchema.parse(category);

  return newcategory;
};

const read = async (): Promise<iAllCategoryReturn> => {
  const categoryRepo: iCategoryRepo = AppDataSource.getRepository(Category);

  const findCategories: Category[] = await categoryRepo.find();

  const category = returnAllCategoriesSchema.parse(findCategories);

  return category;
};

const readIdRealEstate = async (idCategory: number): Promise<object> => {
  const realEstateRepo: iRealEstateRepo =
    AppDataSource.getRepository(RealEstate);
  const categoryRepo: iCategoryRepo = AppDataSource.getRepository(Category);

  const findCategory = await categoryRepo.findOneBy({
    id: idCategory,
  });

  const categories = returnCategorySchema.parse(findCategory);
  const findCategoriesRealEstate: RealEstate[] = await realEstateRepo.find({
    where: {
      category: categories,
    },
  });

  const realEstateFromCategory = {
    ...categories,
    realEstate: findCategoriesRealEstate,
  };

  return realEstateFromCategory;
};

export default { create, read, readIdRealEstate };
