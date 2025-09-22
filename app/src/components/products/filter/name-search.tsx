import { Input } from "@/components/ui/input";
import { ReadonlyURLSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import FilterCard from "./filter-card";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function NameSearch({
  params,
  onValueChange,
}: {
  params: ReadonlyURLSearchParams;
  onValueChange: (index: string, checked: string | undefined) => void;
}) {
  const previousValue = params?.get("search") ?? "";
  const [search, setSearch] = useState<string | undefined>(previousValue);

  // Debounce callback
  const debounced = useDebouncedCallback(
    // function
    () => {
      getSearchValue();
    },
    // delay in ms
    300
  );

  function getSearchValue() {
    const value = ref.current?.value;
    setSearch(value);
  }

  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (previousValue !== search) {
      onValueChange("search", search);
    }
  }, [onValueChange, previousValue, search]);

  return (
    <FilterCard id="search" title="Search">
      <div className="flex focus-within:outline-2 border rounded my-2 mx-1">
        <Input
          defaultValue={search}
          ref={ref}
          type="search"
          placeholder="Search..."
          onChange={() => debounced()}
          className="rounded-s rounded-e-none border-0 focus-visible:ring-2 text-sm"
        />
        <Button
          onClick={() => getSearchValue()}
          type="button"
          className="rounded-s-none rounded-e text-white bg-primary-green cursor-pointer hover:bg-primary-green/80 focus-visible:ring-2"
        >
          <Search />
        </Button>
      </div>
    </FilterCard>
  );
}
