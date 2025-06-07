"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ParkingPricingForm = ({ form }) => {

  return (
    <div className="space-y-5">
      <h3 className="text-xl font-semibold">Parking Hourly Pricing</h3>

      <FormField
        control={form.control}
        name="hourlyRate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Hourly Rate</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="e.g., ₹100 per hour"
                {...field}
                onChange={(e) => {
                  const value = parseInt(e.target.value, 10);
                  console.log(value);
                  field.onChange(isNaN(value) ? 0 : value);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ParkingPricingForm;
