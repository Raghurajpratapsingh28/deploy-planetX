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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const GymAmenitiesForm = ({ form }) => {
  return (
    <div className="space-y-8">
      {/* Gym Equipment Section */}
      <div className="space-y-5">
        <h3 className="text-xl font-semibold font-poppins text-[#0F0D0D]">
          Gym Equipment
        </h3>
        <div className="grid grid-cols-4 gap-2">
          {[
            "treadmill",
            "dumbbells",
            "benchPress",
            "squatRack",
            "elliptical",
            "stationaryBike",
            "cableMachine",
            "rowingMachine",
            "legPress",
            "pullUpBar",
            "kettlebells",
            "resistanceBands",
          ].map((item) => (
            <FormField
              key={item}
              control={form.control}
              name={`amenities.${item}`}
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
                      {item.replace(/([A-Z])/g, " $1")}
                    </Button>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
      </div>

      {/* Facilities Section */}
      <div className="space-y-5">
        <h3 className="text-xl font-semibold font-poppins text-[#0F0D0D]">
          Facilities
        </h3>
        <div className="grid grid-cols-4 gap-2">
          {[
            "lockerRoom",
            "showers",
            "sauna",
            "steamRoom",
            "changingRooms",
            "refreshmentBar",
            "waitingLounge",
            "wifi",
          ].map((facility) => (
            <FormField
              key={facility}
              control={form.control}
              name={`facilities.${facility}`}
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
                      {facility.replace(/([A-Z])/g, " $1")}
                    </Button>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
      </div>

      {/* Trainer Services Section */}
      <div className="space-y-5">
        <h3 className="text-xl font-semibold font-poppins text-[#0F0D0D]">
          Trainer Services
        </h3>
        <div className="grid grid-cols-4 gap-2">
          {["personalTraining", "groupClasses", "nutritionConsulting", "yogaInstructor"].map(
            (service) => (
              <FormField
                key={service}
                control={form.control}
                name={`trainerServices.${service}`}
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
                        {service.replace(/([A-Z])/g, " $1")}
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

      {/* Booking Details Section */}
      <div className="space-y-5">
        <h3 className="text-xl font-semibold font-poppins text-[#0F0D0D]">
          Booking Details
        </h3>
        <div className="flex flex-col gap-3">
          <FormField
            control={form.control}
            name="bookingDetails.operatingHours"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                  Operating Hours
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., 6 AM - 10 PM"
                    className="h-[50px] w-full px-[15px] border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-sm" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bookingDetails.membershipOptions"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                  Membership Options
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., Monthly, Yearly, Drop-in"
                    className="h-[50px] w-full px-[15px] border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-sm" />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Rules Section */}
      <div className="space-y-5">
        <h3 className="text-xl font-semibold font-poppins text-[#0F0D0D]">
          Rules
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {["noOutsideShoes", "towelRequired", "ageRestriction"].map((rule) => (
            <FormField
              key={rule}
              control={form.control}
              name={`rules.${rule}`}
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
                      {rule.replace(/([A-Z])/g, " $1")}
                    </Button>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
      </div>

      {/* Additional Features Section */}
      <div className="space-y-5">
        <h3 className="text-xl font-semibold font-poppins text-[#0F0D0D]">
          Additional Features
        </h3>
        <div className="flex flex-wrap gap-2">
          {[
            { key: "childFriendly", label: "Child Friendly" },
            { key: "coupleFriendly", label: "Couple Friendly" },
            { key: "seniorCitizenFriendly", label: "Senior Citizen Friendly" },
            { key: "localIDAccepted", label: "Local ID Accepted" },
            { key: "pickupDropService", label: "Pickup & Drop Service" },
            { key: "tourGuidance", label: "Tour Guidance" },
          ].map(({ key, label }) => (
            <FormField
              key={key}
              control={form.control}
              name={`additionalFeatures.${key}`}
              render={({ field }) => {
                const safeValue = field.value || {};
                return (
                  <FormItem>
                    <FormControl>
                      <Button
                        type="button"
                        variant="outline"
                        className={`h-[46px] text-base font-normal ${
                          safeValue[key]
                            ? "bg-[#F5F5F5] border-[#7B00FF] text-[#7B00FF]"
                            : "border-[#E1E1E1] text-[#6C696A]"
                        }`}
                        onClick={() =>
                          field.onChange({
                            ...safeValue,
                            [key]: !safeValue[key],
                          })
                        }
                      >
                        {label}
                      </Button>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GymAmenitiesForm;