import { Router } from "express";
import { categoriesController } from "../controllers";
import {
  validatedBody,
  ensureAdminIsValid,
  ensureCategoryIsExists,
  ensureNameCategoryIsExists,
  ensureTokenIsValid,
} from "../middlewares";
import { createCategorySchema } from "../schemas";

const categoriesRoutes: Router = Router();

categoriesRoutes.post(
  "",

  ensureTokenIsValid.verify,
  ensureAdminIsValid.verify,
  ensureNameCategoryIsExists.verify,
  validatedBody.verify(createCategorySchema),
  categoriesController.create
);

categoriesRoutes.get("", categoriesController.read);
categoriesRoutes.get(
  "/:id/realEstate",
  ensureCategoryIsExists.verify,
  categoriesController.readIdRealEstate
);

export { categoriesRoutes };
