"use client";

import {
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ParkingAmenitiesForm = ({ form }) => {
  return (
    <div className="space-y-8">
      {/* Amenities Details */}
      <div className="space-y-5">
        <h3 className="text-xl font-semibold">Amenities</h3>
        <div className="grid grid-cols-3 gap-2">
          {[
            { key: "securityGuard", label: "Security Guard" },
            { key: "securityCameras", label: "Security Cameras" },
            { key: "evCharging", label: "EV Charging" },
            { key: "valetService", label: "Valet Service" },
            { key: "coveredParking", label: "Covered Parking" },
          ].map(({ key, label }) => (
            <FormField
              key={key}
              control={form.control}
              name={`amenitiesDetails.${key}`}
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
                      {label}
                    </Button>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
      </div>

      {/* Accessibility */}
      <div className="space-y-5">
        <h3 className="text-xl font-semibold">Accessibility</h3>
        <div className="grid grid-cols-2 gap-2">
          {[
            { key: "wheelchairAccessible", label: "Wheelchair Accessible" },
            { key: "nearEntrance", label: "Near Entrance" },
          ].map(({ key, label }) => (
            <FormField
              key={key}
              control={form.control}
              name={`accessibility.${key}`}
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
                      {label}
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
      <div className="space-y-5">
        <h3 className="text-xl font-semibold">Coordinates</h3>
        <div className="grid grid-cols-2 gap-4">
          {[
            { name: "coordinates.latitude", placeholder: "Latitude" },
            { name: "coordinates.longitude", placeholder: "Longitude" },
          ].map(({ name, placeholder }) => (
            <FormField
              key={name}
              control={form.control}
              name={name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">{placeholder}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={placeholder}
                      className="h-[50px] px-[15px] border-[#E1E1E1] rounded-lg"
                      {...field}
                      onChange={(e) => {
                        const value = parseInt(e.target.value, 10);
                        console.log(value);
                        field.onChange(isNaN(value)? 0 : value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ParkingAmenitiesForm;
