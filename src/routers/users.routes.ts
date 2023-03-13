import { Router } from "express";
import { usersController } from "../controllers";
import {
  ensureEmailIsExists,
  validatedBody,
  validatedPermission,
} from "../middlewares";
import {
  ensureAdminIsValid,
  ensureTokenIsValid,
  ensureUserIsExists,
} from "../middlewares";
import { createUserSchema, userUpdateSchema } from "../schemas";

const userRoutes: Router = Router();

userRoutes.post(
  "",
  ensureEmailIsExists.verify,
  validatedBody.verify(createUserSchema),
  usersController.create
);
userRoutes.get(
  "",
  ensureTokenIsValid.verify,
  ensureAdminIsValid.verify,
  usersController.read
);

userRoutes.patch(
  "/:id",

  ensureUserIsExists.verify,
  ensureTokenIsValid.verify,
  validatedPermission.verify,
  validatedBody.verify(userUpdateSchema),
  usersController.update
);

userRoutes.delete(
  "/:id",
  ensureUserIsExists.verify,
  ensureTokenIsValid.verify,
  ensureAdminIsValid.verify,
  usersController.del
);

export { userRoutes };
