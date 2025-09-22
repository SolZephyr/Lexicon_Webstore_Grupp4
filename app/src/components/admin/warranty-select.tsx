"use client";
import React from "react";

export default function WarrantySelect({
  initialValue,
  onChange
}: {
  initialValue?: string;
  onChange: (value: string) => void;
}) {
  const options = [
    "No warranty",
    "1 month warranty",
    "3 months warranty",
    "6 months warranty",
    "1 year warranty",
    "2 year warranty",
    "3 year warranty",
    "Lifetime warranty"
  ];

  return (
    <div className="flex flex-col gap-2">
      <label className="font-bold" htmlFor="warranty">
        Warranty
      </label>
      <select
        name="warranty"
        id="warranty"
        defaultValue={initialValue}
        onChange={e => onChange(e.target.value)}
      >
        {options.map((v, i) => (
          <option key={i} value={v}>
            {v}
          </option>
        ))}
      </select>
    </div>
  );
}
