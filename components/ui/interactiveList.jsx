"use client";

import React, { useState } from "react";
import { useFieldArray } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X, Plus } from "lucide-react";

const CustomAmenities = ({ field }) => {
  // console.log(field)
  const { name, value, onChange } = field;
  // const { fields, append, remove } = useFieldArray({
  //   control,
  //   name: "customAmenities", // New array field for custom amenities
  // });
  const [amenityInput, setAmenityInput] = useState("");

  const addAmenity = () => {
    if (amenityInput.trim() !== "") {
      onChange([...value, amenityInput]);
      setAmenityInput("");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          type="text"
          value={amenityInput}
          placeholder="Enter amenity name"
          onChange={(e) => setAmenityInput(e.target.value)}
          className="h-[50px] px-[15px] border border-[#E1E1E1] rounded-lg"
        />
        <Button
          type="button"
          variant="outline"
          className="h-[50px] p-3"
          onClick={addAmenity}
        >
          <Plus className="w-5 h-5" />
        </Button>
      </div>
      <div className="space-y-2">
        {value.map((field, index) => (
          <div
            key={index}
            className="flex items-center justify-between border p-2 rounded-lg"
          >
            <span>{field}</span>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                value.splice(index, 1);
                onChange(value);
              }}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomAmenities;
