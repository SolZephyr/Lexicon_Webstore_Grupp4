"use client";
import { Dimensions } from "@/lib/types";
import { Fragment, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { FormField } from "./product-form";
import { NumberInput } from "./number-input";

export default function DimensionInput({
  initialValues = {
    depth: 0,
    height: 0,
    width: 0
  },
  onUpdates
}: {
  initialValues?: Dimensions;
  onUpdates: (updatedValues: Dimensions) => void;
}) {
  const [dimensions, setDimensions] = useState<Dimensions>(initialValues);

  useEffect(() => {
    onUpdates(dimensions);
  }, [dimensions]);

  return (
    <div className="flex flex-wrap grow justify-between gap-6 items-center">
      {Object.entries(initialValues).map(([key, value], i) => (
        <FormField key={i} name={`dimensions_${key}`} label={key}>
          <NumberInput
            id={`dimensions_${key}`}
            name={`dimensions_${key}`}
            value={value}
            min={0}
            className="w-full"
            onChange={e => setDimensions(prev => ({ ...prev, [key]: e }))}
            max={999}
            step={1}
          />
        </FormField>
      ))}
    </div>
  );
}
