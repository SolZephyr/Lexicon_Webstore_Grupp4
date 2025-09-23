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
export default function WarrantySelect({
  initialValue,
  onChange
}: {
  initialValue?: string;
  onChange: (value: string) => void;
}) {
  return (
    <>
      <Label htmlFor="warranty">Category</Label>
      <Select>
        <SelectTrigger
          name="warranty"
          id="warranty"
          defaultValue={initialValue}
          onChange={e => onChange(e.currentTarget.value)}
        >
          <SelectValue placeholder={"Type of Warranty"} />
        </SelectTrigger>
        <SelectContent>
          {[
            "No warranty",
            "1 month warranty",
            "3 months warranty",
            "6 months warranty",
            "1 year warranty",
            "2 year warranty",
            "3 year warranty",
            "Lifetime warranty"
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
 