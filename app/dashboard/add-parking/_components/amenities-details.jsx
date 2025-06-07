// ParkingAmenitiesDetails.tsx
"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

import ParkingAmenitiesForm from "../_amentiesComponents/parkingAmenities";
import { parkingDefaults } from "../_amentiesComponents/default/parkingDefault";

import parkingAmenitiesSchema from "../_SchemaValidation/amenitiesSchema"

export default function ParkingAmenitiesDetails({
  propertyData,
  setPropertyData,
  setCurrentStep,
}) {
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(parkingAmenitiesSchema),
    defaultValues: parkingDefaults,
  });

  function onSubmit(values) {
    try {
      setPropertyData((prev) => ({ ...prev, ...values }));
      toast({
        title: "Success",
        description: "Parking amenities added successfully!",
      });
      setCurrentStep((prev) => prev + 1);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit form",
        variant: "destructive",
      });
    }
  }

  return (
    <Card className="w-full max-w-[835px] p-5 space-y-5">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-xl font-medium text-[#000000] border-b pb-3">
          Parking Amenities Details
        </CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <ParkingAmenitiesForm form={form} />
          <Button type="submit" className="w-full h-[50px] text-base bg-[#7B00FF] rounded-lg">
            Submit Amenities
          </Button>
        </form>
      </Form>
    </Card>
  );
}
