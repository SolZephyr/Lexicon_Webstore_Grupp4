"use server";
import { getFilterValues } from "@/lib/data/products";
import React from "react";
import { categories } from "@/lib/constants";
import SidebarSheet from "@/components/products/sidebar-sheet";
import SidebarContent from "@/components/products/sidebar-content";

export default async function Sidebar({ category }: { category?: string }) {
  const filterValues = await getFilterValues({
    values: ["brand", "price"],
    categories: category ? [category] : undefined,
  });

  return (
    <aside className="w-full md:w-64">
      <SidebarContent
        categories={categories}
        category={category}
        filterValues={filterValues}
      />
      <SidebarSheet
        categories={categories}
        filterValues={filterValues}
        category={category}
      />
    </aside>
  );
}
