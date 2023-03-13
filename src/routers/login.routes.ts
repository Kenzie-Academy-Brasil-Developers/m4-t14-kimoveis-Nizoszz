import { Router } from "express";
import { loginController } from "../controllers";
import { validatedBody } from "../middlewares";
import { createLoginSchema } from "../schemas";

const loginRoutes: Router = Router();

loginRoutes.post(
  "",
  validatedBody.verify(createLoginSchema),
  loginController.create
);

export { loginRoutes };
