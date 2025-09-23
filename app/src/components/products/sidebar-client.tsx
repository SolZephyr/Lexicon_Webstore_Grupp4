"use client"
import { CategoryProps } from "@/lib/constants";
import SidebarContent from "./sidebar-content";
import SidebarSheet from "./sidebar-sheet";
import { SidebarFilterValues } from "@/lib/types";
import { Smartphone, Tablet, Headphones, Laptop } from "lucide-react";

const ICONS = {
  smartphone: Smartphone,
  tablet: Tablet,
  headphones: Headphones,
  laptop: Laptop,
};

export default function SidebarClient({
  categories,
  category,
  filterValues,
}: {
  categories: CategoryProps[];
  category?: string;
  filterValues: SidebarFilterValues;
}) {

    const categoriesWithIcons = categories.map((c) => ({
    ...c,
    Icon: ICONS[c.icon],
  }));
  return (
    <aside className="w-full md:w-64">
      <SidebarContent categories={categoriesWithIcons} category={category} filterValues={filterValues} />
      <SidebarSheet categories={categoriesWithIcons} category={category} filterValues={filterValues} />
    </aside>
  );
}