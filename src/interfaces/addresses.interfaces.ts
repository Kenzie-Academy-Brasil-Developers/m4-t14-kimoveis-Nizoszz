import { DeepPartial, Repository } from "typeorm";
import { z } from "zod";
import { Address } from "../entities";
import { createAddressSchema, returnAddressSchema } from "../schemas";

type iAddress = z.infer<typeof returnAddressSchema>;
type iAddressReturn = DeepPartial<z.infer<typeof createAddressSchema>>;
type iAddressRepo = Repository<Address>;

export { iAddress, iAddressReturn, iAddressRepo };
