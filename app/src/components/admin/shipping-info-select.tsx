"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../ui/select";

import { Label } from "../ui/label";
export default function ShippingInfoSelect({
  initialValue,
  onChange
}: {
  initialValue?: string;
  onChange: (value: string) => void;
}) {
  return (
    <>
      <Label htmlFor="shipping">Shipping Info</Label>
      <Select>
        <SelectTrigger
          name="shipping"
          id="shipping"
          defaultValue={initialValue}
          onChange={e => onChange(e.currentTarget.value)}
        >
          <SelectValue placeholder={"Shipping Info"} />
        </SelectTrigger>
        <SelectContent>
          {[
            "Ships overnight",
            "Ships in 1-2 business days",
            "Ships in 3-5 business days",
            "Ships in 1 week",
            "Ships in 2 weeks",
            "Ships in 1 month",
          ].map((v, i) => (
            <SelectItem key={i} value={v}>
              {v}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}
