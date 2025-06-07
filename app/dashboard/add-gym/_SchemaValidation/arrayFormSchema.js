import { z } from "zod";

export const ArrayFormSchema = z.object({
    amenitites: z.array(z.string()),
    gymEquipment: z.array(z.string()),
    facilities: z.array(z.string()),
    trainerServices: z.array(z.string()),
    rules: z.array(z.string()),
    additionalFeatures: z.array(z.string()),
});
