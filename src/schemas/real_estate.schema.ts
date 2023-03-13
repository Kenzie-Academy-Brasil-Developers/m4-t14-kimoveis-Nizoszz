import { z } from "zod";
import {
  createAddressSchema,
  returnAddressSchema,
  returnCategorySchema,
} from "../schemas";

const createRealEstateSchema = z.object({
  value: z.number().or(z.string()),
  size: z.number().int().positive(),
  categoryId: z.number().optional().nullish(),
  sold: z.boolean().optional().default(false),
  address: createAddressSchema,
});

const returnRealEstateSchema = createRealEstateSchema
  .extend({
    id: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
    address: returnAddressSchema,
    category: returnCategorySchema,
  })
  .omit({ categoryId: true });

const returnAllRealEstateSchema = returnRealEstateSchema
  .omit({
    category: true,
  })
  .array();

export {
  createRealEstateSchema,
  returnRealEstateSchema,
  returnAllRealEstateSchema,
};
