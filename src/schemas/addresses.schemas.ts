import { z } from "zod";

const createAddressSchema = z.object({
  street: z.string(),
  zipCode: z.string().max(8),
  number: z.string().nullish(),
  city: z.string(),
  state: z.string().max(2),
});

const returnAddressSchema = createAddressSchema.extend({
  id: z.number(),
});

export { createAddressSchema, returnAddressSchema };
