"use client";
import { Dimensions } from "@/lib/types";
import { useEffect, useState } from "react";
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
    <div className='flex flex-wrap grow justify-between gap-6 items-center'>
      {Object.entries(initialValues).map(([key, value], i) => (
        <FormField key={i} name={`dimensions_${key}`} label={key} required>
          <NumberInput
            id={`dimensions_${key}`}
            name={`dimensions_${key}`}
            value={value}
            placeholder='0.00'
            min={0}
            max={999}
            step={1}
            className='w-full'
            onChange={e => setDimensions(prev => ({ ...prev, [key]: e }))}
          />
        </FormField>
      ))}
    </div>
  );
}
