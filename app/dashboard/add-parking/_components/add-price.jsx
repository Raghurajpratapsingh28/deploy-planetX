"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import ParkingPricingForm from "../pricingComponents/parkingPricing";
import { parkingPricingDefaultValues } from "../pricingComponents/default/parkingPricingDefault";
import parkingPricingSchema from "../_SchemaValidation/pricingSchema";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";

export default function AddPrice({ propertyData, setPropertyData, setCurrentStep }) {


  const { toast } = useToast();

  const schema = parkingPricingSchema;
  const defaults = parkingPricingDefaultValues;

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaults,
  });

  const onSubmit = (values) => {
    console.log("Form data", values);
    try {
      setPropertyData((prevPropertyData) => ({
        ...prevPropertyData,
        ...values,
      }));
      setCurrentStep((prev) => prev + 1);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-8 bg-white p-12 rounded-lg w-[55vw]">
          {/* <parkingPricingForm form={form} /> */}
          {/* <parkingPricingForm form={form} /> */}
          <ParkingPricingForm form={form} />
          <div className="flex items-center justify-center">
            <Button
              type="submit"
              className="w-[50%] h-[50px] text-base bg-[#7B00FF] rounded-lg"
            >
              Submit Price
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}