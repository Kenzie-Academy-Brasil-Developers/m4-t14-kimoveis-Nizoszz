import { Router } from "express";
import { realEstateController } from "../controllers";
import {
  ensureAdminIsValid,
  ensureTokenIsValid,
  validatedBody,
} from "../middlewares";
import { createRealEstateSchema } from "../schemas";

const realEstateRoutes: Router = Router();

realEstateRoutes.post(
  "",
  ensureTokenIsValid.verify,
  ensureAdminIsValid.verify,
  validatedBody.verify(createRealEstateSchema),
  realEstateController.create
);

realEstateRoutes.get("", realEstateController.read);

export { realEstateRoutes };
