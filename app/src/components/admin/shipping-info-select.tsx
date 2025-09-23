"use client";
import React from "react";

export default function ShippingInfoSelect({
  initialValue,
  onChange
}: {
  initialValue?: string;
  onChange: (value: string) => void;
}) {
  const options = [
    "Ships overnight",
    "Ships in 1-2 business days",
    "Ships in 3-5 business days",
    "Ships in 1 week",
    "Ships in 2 weeks",
    "Ships in 1 month",
  ];

  return (
    <div className="flex flex-col gap-2">
      <label className="font-bold" htmlFor="shipping-info">
        Shipping Information
      </label>
      <select
        name="shipping-info"
        id="shipping-info"
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
