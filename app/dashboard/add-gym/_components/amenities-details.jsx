"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

import GymAmenitiesForm from "../_amentiesComponents/gymAmenities";
import { gymFormSchema } from "../_amentiesComponents/_schema/gymFormSchema";
import { gymDefaults } from "../_amentiesComponents/default/gymDefault";

export default function AmenitiesDetails({
  propertyData,
  setPropertyData,
  setCurrentStep,
}) {
  const { toast } = useToast();
  const schema = gymFormSchema;
  const defaultValues = gymDefaults;

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  function onSubmit(values) {
    try {
      setPropertyData((prevPropertyData) => ({
        ...prevPropertyData,
        ...values,
      }));
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
    }
  }

  return (
    <Card className="w-full max-w-[835px] p-5 space-y-5">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-xl font-medium text-[#000000] border-b pb-3">
          Amenities Details
        </CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <GymAmenitiesForm form={form} />
          <Button
            type="submit"
            className="w-full h-[50px] text-base bg-[#7B00FF] rounded-lg"
          >
            Submit Amenities
          </Button>
        </form>
      </Form>
    </Card>
  );
}