import { z } from "zod";

export const parkingFormSchema = z.object({
  spotNumber: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  locality: z.string().min(1),
  sublocality: z.string().optional(),
  areaNumber: z.string().optional(),
  type: z.enum(["standard", "disabled", "electric", "compact", "premium"]).default("standard"),
  isAvailable: z.boolean().default(true),
  size: z.enum(["small", "medium", "large"]).default("medium"),
});
