import { Repository } from "typeorm";
import { z } from "zod";
import { RealEstate } from "../entities";
import {
  createRealEstateSchema,
  returnAllRealEstateSchema,
  returnRealEstateSchema,
} from "../schemas";

type iRealEstate = z.infer<typeof createRealEstateSchema>;
type iRealEstateReturn = z.infer<typeof returnRealEstateSchema>;
type iAllRealEstateReturn = z.infer<typeof returnAllRealEstateSchema>;

type iRealEstateRepo = Repository<RealEstate>;

export {
  iRealEstate,
  iRealEstateReturn,
  iRealEstateRepo,
  iAllRealEstateReturn,
};
