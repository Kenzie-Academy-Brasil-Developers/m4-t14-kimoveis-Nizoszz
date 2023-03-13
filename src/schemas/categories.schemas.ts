import { z } from "zod";

const createCategorySchema = z.object({
  name: z.string(),
});

const returnCategorySchema = createCategorySchema.extend({
  id: z.number(),
});

const returnAllCategoriesSchema = returnCategorySchema.array();

export {
  createCategorySchema,
  returnCategorySchema,
  returnAllCategoriesSchema,
};
