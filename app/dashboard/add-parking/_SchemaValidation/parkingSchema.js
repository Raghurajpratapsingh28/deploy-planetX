// ../_amentiesComponents/_schema/parkingFormSchema.ts
import { z } from "zod";

const parkingFormSchema = z.object({
  type: z.enum(["standard", "disabled", "electric", "compact", "premium"]),
  isAvailable: z.boolean().default(true),
  hourlyRate: z.number().min(0, "Hourly rate must be positive"),
  size: z.enum(["small", "medium", "large"]),
  amenitiesDetails: z.object({
    securityGuard: z.boolean().default(false),
    securityCameras: z.boolean().default(false),
    evCharging: z.boolean().default(false),
    valetService: z.boolean().default(false),
    coveredParking: z.boolean().default(false),
  }),
  accessibility: z.object({
    wheelchairAccessible: z.boolean().default(false),
    nearEntrance: z.boolean().default(false),
  }),
});

export default parkingFormSchema;
