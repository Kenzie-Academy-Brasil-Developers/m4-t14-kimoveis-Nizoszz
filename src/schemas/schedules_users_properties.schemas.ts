import { z } from "zod";
import { returnRealEstateSchema } from "./real_estate.schema";
import { returnUserSchema } from "./users.schemas";

const createSchedulesSchema = z.object({
  date: z.string(),
  hour: z.string(),
  realEstateId: z.number(),
});

const returnSchedulesSchema = createSchedulesSchema.extend({
  id: z.number(),
  userId: z.number(),
});

const returnAllSchedulesSchema = createSchedulesSchema
  .extend({
    realEstate: returnRealEstateSchema,
    user: returnUserSchema,
  })
  .omit({ realEstateId: true });

export {
  createSchedulesSchema,
  returnSchedulesSchema,
  returnAllSchedulesSchema,
};
