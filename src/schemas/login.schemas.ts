import { z } from "zod";

const createLoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export { createLoginSchema };
