import { getFilterValues } from "@/lib/data/products";
import React from "react";
import { categories } from "@/lib/constants";
import SidebarClient from "@/components/products/sidebar-client";

export default async function Sidebar({ category }: { category?: string }) {
  const filterValues = await getFilterValues({
    values: ["brand", "price"],
    categories: category ? [category] : undefined,
  });

  return (
    <SidebarClient
      categories={categories}
      category={category}
      filterValues={filterValues}
    />
  );
}
