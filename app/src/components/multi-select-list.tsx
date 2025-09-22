"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import FilterCard from "./products/filter/filter-card";

interface MultiSelectItem {
  id: string;
  label: string;
}

interface MultiSelectListProps {
  items: MultiSelectItem[];
  title?: string;
  selected: string[];
  onSelectionChange?: (selectedIds: string[]) => void;
  className?: string;
}

export function MultiSelectList({
  items,
  selected,
  title = "Select Items",
  onSelectionChange,
  className = "",
}: MultiSelectListProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>(selected);

  const handleItemToggle = async (
    itemId: string,
    e?: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e?.preventDefault();
    e?.stopPropagation();

    const newSelection = selectedItems.includes(itemId)
      ? selectedItems.filter((id) => id !== itemId)
      : [...selectedItems, itemId];

    setSelectedItems([...newSelection]);
    onSelectionChange?.(newSelection);
  };

  return (
    <FilterCard id="brand" className={className} title={title}>
      {items.map((item) => (
        <div
          key={item.id}
          className="flex px-2 items-center space-x-3 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer focus-within:underline "
          onClick={(e) => handleItemToggle(item.id, e)}
        >
          <Checkbox
            id={item.id}
            name={item.id}
            text={item.label}
            checked={selectedItems.includes(item.id)}
            color="#200"
            className="data-[state=checked]:bg-primary-green data-[state=checked]:border-none border-primary-green rounded-none shadow cursor-pointer"
          />
          <span className="text-sm inline-block font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 py-2">
            {item.label}
          </span>
        </div>
      ))}
    </FilterCard>
  );
}
