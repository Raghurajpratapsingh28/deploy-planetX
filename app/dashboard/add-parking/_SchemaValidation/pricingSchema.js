// ../_amentiesComponents/_schema/parkingFormSchema.ts
import { z } from "zod";

const parkingPricingSchema = z.object({
  hourlyRate: z.number().min(0),
});

export default parkingPricingSchema;
