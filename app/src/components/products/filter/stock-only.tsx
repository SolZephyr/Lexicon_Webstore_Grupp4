import { Checkbox } from "@/components/ui/checkbox";
import { ReadonlyURLSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import FilterCard from "./filter-card";
import { useDebouncedCallback } from "use-debounce";

export default function StockCheck({
  params,
  onCheckedChange,
}: {
  params: ReadonlyURLSearchParams;
  onCheckedChange: (index: string, checked: string | undefined) => void;
}) {
  const prevValue = params.has("stock");
  const [stock, setStock] = useState(prevValue);

  const flipState = () => setStock((val) => !val);

  // Debounce callback
  const debounced = useDebouncedCallback(() => {
    if (prevValue !== stock) onCheckedChange("stock", stock ? "1" : undefined);
  }, 750);

  useEffect(() => {
    if (stock != prevValue) debounced();
  }, [debounced, prevValue, stock]);

  return (
    <FilterCard id="stock" title="Stock">
      <div
        className="flex border-0 items-center space-x-2 rounded-lg transition-colors cursor-pointer focus-within:underline mx-1"
        onClick={flipState}
      >
        <Checkbox
          id="inStock"
          name="inStock"
          text="Show items in stock only"
          className="data-[state=checked]:bg-primary-green data-[state=checked]:border-none rounded cursor-pointer"
          checked={stock}
        />
        <span className="text-sm inline-block font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 py-2">
          Only In Stock
        </span>
      </div>
    </FilterCard>
  );
}
