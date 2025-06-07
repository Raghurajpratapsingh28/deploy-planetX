"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSearchParams } from "next/navigation";
import GymForm from "./_addPropertyComponents/gym";
import { GymSchema } from "../_SchemaValidation/gymSchema";
import SelectButton from "./selectButton";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Sheet } from "@/components/ui/sheet";

const statesOfIndia = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

export const PropertyDetailsForm = ({ setPropertyData, setCurrentStep }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  // const searchParams = useSearchParams();

  // const propertyType = searchParams.get("propertyType");

  const schema = GymSchema;
  const defaultValues = {
    city: "",
    state: "",
    locality: "",
    subLocality: "",
    apartment: "",
    gymName: "",
    gymDescription: "",
    gymType: "",
    bookingDetails: {
      operationHours: "",
      membershipOption: "",
    },

    availableStatus: "",
    capacity: 0,
    ageOfGym: -1,
    membershipType: "",
    equipmentType: "",
  };

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  function onSubmit(values) {
    setIsSubmitting(true);
    try {
      setPropertyData((prev) => {return  {...prev, ...values}});
      toast({
        title: "Success",
        description: "Property added successfully!",
        variant: "default",
      });
      setCurrentStep((prev) => prev + 1);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to add property",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <Card className="w-[835px] bg-white border border-[#E1E1E1] rounded-xl p-5">
      <CardContent className="p-0">
        <div className="border-b border-[#E1E1E1] pb-2.5 mb-5">
          <h2 className="text-xl font-medium font-poppins text-[#000000]">
            Property Details
          </h2>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-2 gap-5">
              {/* Property Type */}
              {/* <FormField
                control={form.control}
                name="propertyType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                      Type
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <select
                          value={["Select Type", "For Sale", "For Rent", "Commercial"]}
                          {...field}
                          className="w-full h-[58px] px-[15px] border border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins appearance-none"
                        >
                          <option value="">Select Type</option>
                          <option value="For Sale">For Sale</option>
                          <option value="For Rent">For Rent</option>
                          <option value="Commercial">Commercial</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-[#0F0D0D] pointer-events-none" />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              /> */}

              {/* Category */}
              <FormField
                control={form.control}
                name="gymType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                      Gym Type
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <select
                          {...field}
                          // value={"Select Category"}
                          className="w-full h-[58px] px-[15px] border border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins appearance-none"
                        >
                          <option value="">Select Category</option>
                          <option value="Public">Public</option>
                          <option value="Private">Private</option>
                          <option value="Celebrity">Celebrity</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-[#0F0D0D] pointer-events-none" />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />

              {/* City */}
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                      City
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter City"
                        className="h-[58px] px-[15px] border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />

              {/* State */}
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                      State
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <select
                          value={[]}
                          {...field}
                          className="w-full h-[58px] px-[15px] border border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins appearance-none"
                        >
                          <option value="">Select State</option>
                          {statesOfIndia.map((val, ind) => {
                            return (
                              <option key={ind} value={val}>
                                {val}
                              </option>
                            );
                          })}
                          {/* State options omitted for brevity */}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-[#0F0D0D] pointer-events-none" />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />

              {/* Locality / Apartment */}
              <FormField
                control={form.control}
                name="locality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                      Locality / Apartment
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Locality / Apartment"
                        className="h-[58px] px-[15px] border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />

              {/* Sub Locality */}
              <FormField
                control={form.control}
                name="subLocality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                      Sub Locality (Optional)
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Sub Locality"
                        className="h-[58px] px-[15px] border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />

              {/* Apartment */}
              <FormField
                control={form.control}
                name="apartment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                      Apartment
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Apartment"
                        className="h-[58px] px-[15px] border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />

              {/* House Number */}
              {/* <FormField
                control={form.control}
                name="apartment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                      House No. (Optional)
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter House No."
                        className="h-[58px] px-[15px] border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              /> */}
            </div>

            {/* Gym-specific form component */}
            {/* <GymForm form={form} /> */}

            {/* <FormField
              control={form.control}
              name="availabilityStatus"
              render={({ field }) => (
                <FormItem>
                  <SelectButton
                    name="Availability Status"
                    options={[
                      "Available",
                      "Rented",
                      "Sold",
                      "Under Construction",
                    ]}
                    value={field.value}
                    onChange={field.onChange}
                  />
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            /> */}

            <div className="grid grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="bookingDetails.operationHours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                      Operational Hours
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Operational Hours."
                        className="h-[58px] px-[15px] border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bookingDetails.membershipOption"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                      Membership Type
                    </FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="focus:outline-none focus:ring-0 focus:border-transparent h-[50px]">
                          <SelectValue placeholder="Select Membership Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Basic">Basic</SelectItem>
                          <SelectItem value="Premium">Premium</SelectItem>
                          <SelectItem value="VIP">VIP</SelectItem>
                          <SelectItem value="Corporate">Corporate</SelectItem>
                          <SelectItem value="Student">Student</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="availableStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                      Available Status
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <select
                          {...field}
                          // value={"Select Category"}
                          className="w-full h-[58px] px-[15px] border border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins appearance-none"
                        >
                          <option value="">Select Category</option>
                          <option value="Available">Available</option>
                          <option value="Not Available">Not Available</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-[#0F0D0D] pointer-events-none" />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="capacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                      Capacity
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter Operational Hours."
                        className="h-[58px] px-[15px] border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins"
                        {...field}
                        onChange={(e) => {
                          const value = parseInt(e.target.value, 10);
                          console.log(value === NaN ? 0 : value);
                          field.onChange(isNaN(value) ? 0 : value);
                        }}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ageOfGym"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                      Age Of Gym
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter Operational Hours."
                        className="h-[58px] px-[15px] border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins"
                        {...field}
                        onChange={(e) => {
                          const value = parseInt(e.target.value, 10);
                          console.log(value === NaN ? 0 : value);
                          field.onChange(isNaN(value) ? 0 : value);
                        }}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="membershipType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                      Membership Type
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Operational Hours."
                        className="h-[58px] px-[15px] border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="equipmentType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                      Equipment Type
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Operational Hours."
                        className="h-[58px] px-[15px] border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="gymName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                    Gym Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Gym Name."
                      className="h-[58px] px-[15px] border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="gymDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                    Add Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add Description"
                      className="min-h-[126px] px-[15px] py-4 border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full h-[50px] bg-[#7B00FF] text-white font-medium font-poppins rounded-[10px]"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Property Details"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
