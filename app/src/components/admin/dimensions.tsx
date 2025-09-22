"use client";
import { Dimensions } from "@/lib/types";
import React, { Fragment, useEffect, useState } from "react";

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
  useEffect(() => onUpdates(dimensions), [dimensions]);

  return (
    <div className="flex flex-col gap-2 w-fit items-center p-2">
      {Object.entries(dimensions).map(([key, value]) => (
        <div key={key} className="flex flex-col w-40">
          <label className="capitalize m-0" htmlFor={`dimensions_${key}`}>
            {key}
          </label>
          <div className="flex gap-2 items-center">
            <input
              className="border p-1 rounded grow w-20"
              id={`dimensions_${key}`}
              name={`dimensions_${key}`}
              required
              min={0}
              onChange={e =>
                setDimensions(prev => ({ ...prev, [key]: +e.target.value }))
              }
              defaultValue={value}
              type="number"
            />
            <span>Cm.</span>
          </div>
        </div>
      ))}
    </div>
  );
}
