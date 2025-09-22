"use client";

import { Slider } from "@/components/ui/slider";
import { ReadonlyURLSearchParams } from "next/navigation";
import { useState } from "react";
import FilterCard from "./filter-card";

export default function PriceSlider({
  onRangeUpdate,
  params,
  values,
}: {
  onRangeUpdate: (index: string[], value: string[]) => void;
  params: ReadonlyURLSearchParams;
  values: number[];
  title?: string;
}) {

  const prices = values.map(val => Number(val));

  const rangeMin = prices ? Math.min(...prices) : 0;
  const rangeMax = prices ? Math.max(...prices) : 0;

  const selectedMin = params.has("priceMin") ? Number(params.get("priceMin")) : rangeMin;
  const selectedMax = params.has("priceMax") ? Number(params.get("priceMax")) : rangeMax;

  const [current, setCurrent] = useState([selectedMin, selectedMax]);

  const handleAdjust = (e: number[]) => {
    setCurrent(e);
  }

  const handleSelected = (e: number[]) => {
    onRangeUpdate?.(["priceMin", "priceMax"], e.map(i => i.toString()));
  }


  return (
    <FilterCard id="price" title={"Price"}>
      <div className="mx-1 mt-3">
        <Slider min={rangeMin} max={rangeMax}
          defaultValue={[selectedMin, selectedMax]}
          onValueChange={(e) => handleAdjust(e)}
          onValueCommit={(e) => handleSelected(e)}
        />
        <div className="flex flex-row mt-3 justify-between font-medium">
          <div>{current[0]}</div>
          <div>{current[1]}</div>
        </div>
      </div>
    </FilterCard>
  );
}