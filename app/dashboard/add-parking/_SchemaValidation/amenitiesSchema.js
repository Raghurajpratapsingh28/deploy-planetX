// ../_amentiesComponents/_schema/parkingFormSchema.ts
import { z } from "zod";

const parkingAmenitiesSchema = z.object({
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

  coordinates: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
});

export default parkingAmenitiesSchema;
