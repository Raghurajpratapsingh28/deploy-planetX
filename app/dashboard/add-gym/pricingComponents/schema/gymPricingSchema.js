// gymPricing.schema.js
import { z } from "zod";

export const gymPricingSchema = z.object({
  pricing: z.object({
    baseMembershipPrice: z.number().min(0),
    discount: z.number().min(0).optional(),
    taxes: z.number().min(0),
    finalPrice: z.number().min(0),
  }),
});
