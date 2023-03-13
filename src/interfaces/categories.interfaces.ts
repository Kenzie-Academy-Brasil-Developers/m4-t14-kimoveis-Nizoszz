import { z } from "zod";

import { Repository } from "typeorm";
import {
  createCategorySchema,
  returnAllCategoriesSchema,
  returnCategorySchema,
} from "../schemas";
import { Category } from "../entities";


type iCategory = z.infer<typeof createCategorySchema>;
type iCategoryReturn = z.infer<typeof returnCategorySchema>;
type iAllCategoryReturn = z.infer<typeof returnAllCategoriesSchema>;


type iCategoryRepo = Repository<Category>;

export {
  iCategory,
  iCategoryReturn,
  iCategoryRepo,
  iAllCategoryReturn,

};
