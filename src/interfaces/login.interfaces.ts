import { z } from "zod";
import { createLoginSchema } from "../schemas";

type iLoginRequest = z.infer<typeof createLoginSchema>;

export { iLoginRequest };
