import { z } from "zod";

const createUserSchema = z.object({
  name: z.string().max(45),
  email: z.string().email().max(45),
  admin: z.boolean().optional().default(false),
  password: z
    .string()
    .min(4, "Must be at least 4 characters in length")
    .max(120),
});

const returnUserSchema = createUserSchema
  .extend({
    id: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.string().nullable(),
  })
  .omit({ password: true });

const returnAllUsersSchema = returnUserSchema.array();

const userUpdateSchema = createUserSchema.partial();

export {
  createUserSchema,
  returnUserSchema,
  returnAllUsersSchema,
  userUpdateSchema,
};
