"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ParkingForm = ({ form }) => {
  return (
    <div className="space-y-8">
      {/* Basic Details Section */}
      <div className="space-y-5">
        <h3 className="text-xl font-semibold font-poppins text-[#0F0D0D]">
          Parking Spot Details
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {["spotNumber", "location", "city", "state", "locality", "sublocality", "areaNumber"].map(
            (fieldName) => (
              <FormField
                key={fieldName}
                control={form.control}
                name={fieldName}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{fieldName.replace(/([A-Z])/g, " $1")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={`Enter ${fieldName}`}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )
          )}
        </div>
      </div>

      {/* Type, Size and Rate */}
      <div className="grid grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Input placeholder="e.g. standard, disabled" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="size"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Size</FormLabel>
              <FormControl>
                <Input placeholder="e.g. small, medium, large" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="hourlyRate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hourly Rate</FormLabel>
              <FormControl>
                <Input type="number" min={0} placeholder="e.g. 50" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Amenities */}
      <div className="space-y-5">
        <h3 className="text-xl font-semibold font-poppins text-[#0F0D0D]">Amenities</h3>
        <div className="grid grid-cols-3 gap-2">
          {["securityGuard", "securityCameras", "evCharging", "valetService", "coveredParking"].map(
            (amenity) => (
              <FormField
                key={amenity}
                control={form.control}
                name={`amenitiesDetails.${amenity}`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Button
                        type="button"
                        variant="outline"
                        className={`h-[46px] w-full text-base font-normal ${
                          field.value
                            ? "bg-[#F5F5F5] border-[#7B00FF] text-[#7B00FF]"
                            : "border-[#E1E1E1] text-[#6C696A]"
                        }`}
                        onClick={() => field.onChange(!field.value)}
                      >
                        {amenity.replace(/([A-Z])/g, " $1")}
                      </Button>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )
          )}
        </div>
      </div>

      {/* Accessibility */}
      <div className="space-y-5">
        <h3 className="text-xl font-semibold font-poppins text-[#0F0D0D]">Accessibility</h3>
        <div className="grid grid-cols-2 gap-2">
          {["wheelchairAccessible", "nearEntrance"].map((access) => (
            <FormField
              key={access}
              control={form.control}
              name={`accessibility.${access}`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Button
                      type="button"
                      variant="outline"
                      className={`h-[46px] w-full text-base font-normal ${
                        field.value
                          ? "bg-[#F5F5F5] border-[#7B00FF] text-[#7B00FF]"
                          : "border-[#E1E1E1] text-[#6C696A]"
                      }`}
                      onClick={() => field.onChange(!field.value)}
                    >
                      {access.replace(/([A-Z])/g, " $1")}
                    </Button>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
      </div>

      {/* Coordinates */}
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="coordinates.latitude"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Latitude</FormLabel>
              <FormControl>
                <Input type="number" step="any" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="coordinates.longitude"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Longitude</FormLabel>
              <FormControl>
                <Input type="number" step="any" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default ParkingForm;