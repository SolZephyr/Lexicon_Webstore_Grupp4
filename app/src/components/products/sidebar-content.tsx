import FilterArea from "@/components/products/filter-area";
import { CategoryProps } from "@/lib/constants";
import { SidebarFilterValues } from "@/lib/types";
import { cn } from "@/lib/utils";
import { SlidersHorizontal } from "lucide-react";
import Link from "next/link";

interface SidebarContentProps {
  categories: CategoryProps[];
  category?: string;
  filterValues: SidebarFilterValues;
  mobile?: boolean;
}

export default function SidebarContent({
  categories,
  category,
  filterValues,
  mobile,
}: SidebarContentProps) {
  return (
    <div
      className={cn(" flex-col gap-4", {
        "hidden md:flex": !mobile,
        "flex p-4 overflow-auto": mobile,
      })}
    >
      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-bold border-b-2 pb-2 border-neutral-500">
          Categories
        </h2>
        <ul className="flex flex-col gap-0.5">
          {categories.map((c, index) => {
            const isActive = category === c.href.split("/").pop();
            return (
              <li key={index} className="flex">
                <Link
                  href={c.href}
                  className={cn(
                    "bg-accent/70 capitalize w-full px-2 py-2 rounded text-sm hover:bg-gray-200 transition-all font-semibold flex gap-2 items-center",
                    isActive &&
                      "bg-primary-green text-white hover:bg-brand-700"
                  )}
                >
                  <c.icon size={20} strokeWidth={1} />
                  {c.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
      <section className="flex flex-col gap-2">
        <div className="flex items-center gap-2 pb-2 border-b-2 border-black">
          <SlidersHorizontal size={16} />
          <h2 className="text-lg font-bold">Filters</h2>
        </div>
        <FilterArea task={filterValues} />
      </section>
    </div>
  );
}
