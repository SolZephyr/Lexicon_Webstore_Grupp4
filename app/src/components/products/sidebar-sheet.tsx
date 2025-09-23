import SidebarContent from "@/components/products/sidebar-content";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CategoryProps } from "@/lib/constants";
import { SidebarFilterValues } from "@/lib/types";
import { SlidersHorizontal } from "lucide-react";

interface SidebarSheetProps {
  categories: CategoryProps[];
  category?: string;
  filterValues: SidebarFilterValues; // keep the type from getFilterValues
}

export default function SidebarSheet({
  categories,
  category,
  filterValues,
}: SidebarSheetProps) {
  return (
    <div className="flex md:hidden">
      <Sheet>
        <SheetTrigger asChild id="filters-trigger">
          <Button className="w-full rounded cursor-pointer bg-brand-600 hover:bg-brand-700">
            <SlidersHorizontal />
            Filters
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-full xs:w-[400px] gap-0"
          id="filters-content"
        >
          <SheetHeader className="shadow">
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>
          <SidebarContent
            categories={categories}
            category={category}
            filterValues={filterValues}
            mobile={true}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
}
