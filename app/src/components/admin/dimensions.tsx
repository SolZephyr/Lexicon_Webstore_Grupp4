"use client";
import { Dimensions } from "@/lib/types";
import { useState } from "react";
import { FormField } from "./product-form";
import { NumberInput } from "./number-input";

export default function DimensionInput({
  initialValues = {
    depth: 0,
    height: 0,
    width: 0
  },
  errors,
  onUpdates
}: {
  initialValues?: Dimensions;
  errors?: Record<string, string>;
  onUpdates: (updatedValues: Dimensions) => void;
}) {
  const [dimensions, setDimensions] = useState<Dimensions>(initialValues);

  const setValues = (key: string, value: number | undefined) => {
    if (value) setDimensions(prev => ({ ...prev, [key]: value }));
    onUpdates(dimensions);
  };

  return (
    <div className='flex flex-wrap grow justify-between gap-6 items-center'>
      {Object.entries(initialValues).map(([key, value], i) => (
        <FormField
          key={i}
          name={`dimensions_${key}`}
          label={key}
          error={errors?.[`dimensions_${key}`]}
        >
          <NumberInput
            id={``}
            name={`dimensions_${key}`}
            value={value}
            placeholder='0.00'
            min={0}
            max={999}
            step={1}
            className='w-full'
            onChange={e => setValues(key, e)}
          />
        </FormField>
      ))}
    </div>
  );
}
