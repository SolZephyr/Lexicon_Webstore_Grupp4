"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../ui/select";

export default function ShippingInfoSelect({
  initialValue,
  onChange
}: {
  initialValue?: string;
  onChange: (value: string) => void;
}) {
  return (
    <Select
      name='shipping'
      defaultValue={initialValue}
      onValueChange={e => onChange(e)}
    >
      <SelectTrigger className='w-full'>
        <SelectValue placeholder={"Shipping Info"} />
      </SelectTrigger>
      <SelectContent>
        {[
          "Ships overnight",
          "Ships in 1-2 business days",
          "Ships in 3-5 business days",
          "Ships in 1 week",
          "Ships in 2 weeks",
          "Ships in 1 month"
        ].map((v, i) => (
          <SelectItem key={i} value={v}>
            {v}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
