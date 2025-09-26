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
  onChange,
  className
}: {
  initialValue?: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  return (
    <Select
      name='shipping'
      defaultValue={initialValue}
      onValueChange={e => onChange(e)}
      required
    >
      <SelectTrigger className={`w-full ${className ?? ''}`}>
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
