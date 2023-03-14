import { Router } from "express";
import { schedulesController } from "../controllers";
import {
  ensureAdminIsValid,
  ensureTokenIsValid,
  validatedBody,
} from "../middlewares";
import { createSchedulesSchema } from "../schemas";

const schedulesRoutes: Router = Router();

schedulesRoutes.post(
  "",
  ensureTokenIsValid.verify,
  validatedBody.verify(createSchedulesSchema),
  schedulesController.create
);

schedulesRoutes.get(
  "/realEstate/:id",
  ensureTokenIsValid.verify,
  ensureAdminIsValid.verify,
  schedulesController.read
);

export { schedulesRoutes };
