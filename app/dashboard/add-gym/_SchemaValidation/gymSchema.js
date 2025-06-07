import { z } from "zod";

export const GymSchema = z.object({
  // propertyType: z.string().min(1, "Property type is required"),
  // category: z.literal("Gym"),
  // location: z.object({
  //   city: z.string().min(1, "City is required"),
  //   state: z.string().min(1, "State is required"),
  //   locality: z.string().min(1, "Locality is required"),
  //   subLocality: z.string().optional(),
  //   apartment: z.string().min(1, "Apartment is required"),
  //   houseNumber: z.string().optional(),
  // }),
  city: z.string().min(1),
  state: z.string().min(1),
  locality: z.string().optional(),
  subLocality: z.string().optional(),
  apartment: z.string().optional(),
  gymName: z.string().min(1),
  gymDescription: z.string().min(10),  
  gymType: z.enum(["Public", "Private", "Celebrity"]),
  bookingDetails: z.object({
    operationHours: z.string().optional(),
    membershipOption: z.string().optional(),
  }),

  capacity: z.number().min(1),
  ageOfGym: z.number().min(0),
  membershipType: z.string().min(1),
  equipmentType: z.string().min(1),
  availableStatus: z.enum(["Available", "Not Available"]),

  // subCategory: z.enum(["Public", "Private", "Celebrity"]),
  // propertyDetails: z.object({
  //   propertyName: z.string().min(1, "Gym name is required"),
  //   gymType: z.enum(["Public", "Private", "Celebrity"]),
  //   rating: z
  //     .number()
  //     .min(1, "Rating must be at least 1")
  //     .max(5, "Rating must be at most 5"),
  //   totalMembers: z.number().min(1, "At least 1 member required"),
  //   equipmentTypes: z.string().optional(),
  //   amenities: z.array(z.string()).optional(),
  // }),
  // membershipDetails: z.object({
  //   membershipType: z.string().min(1, "Membership type is required"),
  //   pricePerMonth: z.number().min(1, "Price must be positive"),
  //   personalTrainerAvailable: z.boolean(),
  //   groupClassesAvailable: z.boolean(),
  // }),
  // ageOfProperty: z.number().min(0, "Age of property cannot be negative"),
  // description: z.string().optional(),
});
