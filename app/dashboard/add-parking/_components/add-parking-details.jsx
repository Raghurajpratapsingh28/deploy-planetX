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
import parkingForm from "./_addPropertyComponents/parking";
import { parkingFormSchema } from "../_amentiesComponents/_schema/parkingFormSchema";
import SelectButton from "./selectButton";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";

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

  const schema = parkingFormSchema;
  const defaultValues = {
    spotNumber: "",
    city: "",
    state: "",
    locality: "",
    sublocality: "",
    areaNumber: "",
    type: "standard",
    isAvailable: true,
    size: "medium",
  };

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  function onSubmit(values) {
    setIsSubmitting(true);
    console.log(values)
    try {
      setPropertyData((prev) => ({ ...prev, ...values }));
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
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                      Parking Type
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <select
                          // value={[
                          //   "standard",
                          //   "disabled",
                          //   "electric",
                          // ]}
                          value={"standard"}
                          {...field}
                          className="w-full h-[58px] px-[15px] border border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins appearance-none"
                        >
                          <option value="standard">Standard</option>
                          <option value="disabled">Disabled</option>
                          <option value="electric">Electric</option>
                          <option value="compact">Compact</option>
                          <option value="premium">Premium</option>

                          {/* <option value="">Select Type</option>
                          <option value="For Sale">For Sale</option>
                          <option value="For Rent">For Rent</option>
                          <option value="Commercial">Commercial</option> */}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-[#0F0D0D] pointer-events-none" />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />

              {/* Category */}
              {/* <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                      Property Category
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <select
                          {...field}
                          value={"Select Category"}
                          className="w-full h-[58px] px-[15px] border border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins appearance-none"
                        >
                          <option value="">Select Category</option>
                          <option value="public">Public</option>
                          <option value="private">Private</option>
                          <option value="celebrity">Celebrity</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-[#0F0D0D] pointer-events-none" />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              /> */}

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
                          value={""}
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
                      Locality
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Locality"
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
                name="areaNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                      Area Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Area Number"
                        className="h-[58px] px-[15px] border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />

              {/* House Number */}
              <FormField
                control={form.control}
                name="spotNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                      Spot Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Spot Number."
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
              name="isAvailable"
              render={({ field }) => (
                <FormItem>
                  <Checkbox />
                  <FormLabel className="ml-3 text-base font-medium font-poppins text-[#0F0D0D]">
                    Available
                  </FormLabel>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="size"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                    Size
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <select
                        value={"medium"}
                        {...field}
                        className="w-full h-[58px] px-[15px] border border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins appearance-none"
                      >
                        <option value={"small"}>Small</option>
                        <option value={"medium"}>Medium</option>
                        <option value={"large"}>Large</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-[#0F0D0D] pointer-events-none" />
                    </div>
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
