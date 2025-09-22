"use server";
import { getFilterValues } from "@/lib/data/products";
import Link from "next/link";
import React, { Suspense } from "react";
import FilterArea from "./filter-area";

export default async function Sidebar({ category }: { category?: string }) {
  const categories = [
    "smartphones",
    "tablets",
    "mobile-accessories",
    "laptops",
  ];

  const filterValues = getFilterValues({
    values: ["brand", "price"],
    categories: category ? [category] : undefined,
  });

  return (
    <aside className="flex flex-col sm:w-60 w-full gap-4">
      <section className="p-2 flex flex-col gap-2 rounded border-2 border-primary-green">
        <h2 className="text-xl px-2 py-3 font-bold uppercase border border-x-0 border-t-0 border-b-primary-green">
          Categories
        </h2>
        <ul className="p-2">
          {categories.map((c, index) => (
            <li key={index}>
              <Link
                href={`/category/${c}`}
                className="capitalize text-sm hover:underline"
              >
                {c}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section className="p-2 rounded border-2 border-primary-green">
        <h2 className="text-xl px-2 py-3 font-bold uppercase border border-x-0 border-t-0 border-b-primary-green">
          Filters
        </h2>
        <Suspense>
          <FilterArea task={filterValues} />
        </Suspense>
      </section>
    </aside>
  );
}
