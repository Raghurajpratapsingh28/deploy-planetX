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
import { ArrayFormSchema } from "../_SchemaValidation/arrayFormSchema";
import CustomAmenities from "@/components/ui/interactiveList";
import { data } from "autoprefixer";

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

const ArrayForm = ({ setPropertyData, setCurrentStep }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  // const searchParams = useSearchParams();

  // const propertyType = searchParams.get("propertyType");

  const schema = ArrayFormSchema;
  const defaultValues = {
    amenitites: [],
    gymEquipment: [],
    facilities: [],
    trainerServices: [],
    rules: [],
    additionalFeatures: [],
  };

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  function onSubmit(values) {
    setIsSubmitting(true);
    try {
        setPropertyData((prev) => { return {...prev, ...values} });
        toast({
          title: "Success",
          description: "Property added successfully!",
          variant: "default",
        });
        setCurrentStep((prev) => prev + 1);
    //   console.log(values);
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
            <FormField
              control={form.control}
              name="amenitites"
              render={({ field }) => {
                return (
                 <FormItem>
                  <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                    Amenities
                  </FormLabel>
                  <FormControl>
                    <CustomAmenities field={field} />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}}
            />

            <FormField
              control={form.control}
              name="gymEquipment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                    Gym Equipment
                  </FormLabel>
                  <FormControl>
                    <CustomAmenities field={field} />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="facilities"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                    Facilities
                  </FormLabel>
                  <FormControl>
                    <CustomAmenities field={field} />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="trainerServices"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                    Trainer Services
                  </FormLabel>
                  <FormControl>
                    <CustomAmenities field={field} />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rules"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                    Rules
                  </FormLabel>
                  <FormControl>
                    <CustomAmenities field={field} />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="additionalFeatures"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                    Additional Features
                  </FormLabel>
                  <FormControl>
                    <CustomAmenities field={field} />
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

export default ArrayForm;
