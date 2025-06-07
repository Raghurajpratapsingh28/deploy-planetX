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

const GymPricingForm = ({ form }) => {
  const { watch, setValue } = form;
  const baseMembershipFee = watch("pricing.baseMembershipPrice");
  const discount = watch("pricing.discount");
  const taxes = watch("pricing.taxes");

  useEffect(() => {
    const finalPrice =
      Number(baseMembershipFee) - Number(discount) + Number(taxes);
    setValue("pricing.finalPrice", finalPrice);
  }, [baseMembershipFee, discount, taxes, setValue]);

  return (
    <>
      <div className="space-y-5">
        <h3 className="text-xl font-semibold">Gym Membership Pricing</h3>

        <FormField
          control={form.control}
          name="pricing.baseMembershipPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Base Membership Fee</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="e.g., ₹2000 per month"
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

        <FormField
          control={form.control}
          name="pricing.discount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Discount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="e.g., ₹500 off for first month"
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

        <FormField
          control={form.control}
          name="pricing.taxes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Taxes</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="e.g., ₹180 (9% GST)"
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

        <FormField
          control={form.control}
          name="pricing.finalPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Payable Amount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  disabled
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
    </>
  );
};

export default GymPricingForm;
