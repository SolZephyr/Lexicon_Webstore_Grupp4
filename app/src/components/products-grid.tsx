"use client";
import { ThinProductList } from "@/lib/types";
import ProductCard from "./product-card";
import { use } from "react";
import { PaginationFilter, PaginationPaging } from "./pagination";

export default function ProductsGrid({
  productsTask: listTask,
  title,
  gridHeader,
  emptyText,
  className,
}: {
  productsTask: Promise<ThinProductList>;
  title?: string;
  gridHeader?: { title: string; desc: string };
  page?: number;
  emptyText?: string;
} & React.ComponentProps<"div">) {
  const data = use(listTask);
  const { products, total, limit, skip } = data;
  const page = Math.floor(skip / limit) + 1;

  return (
    <section className={`flex flex-col flex-1 gap-4 ${className || ""}`}>
      {gridHeader && (
        <div className="mb-2">
          <h2 className="text-3xl font-bold capitalize">{gridHeader.title}</h2>
          <p className="text-sm py-2">{gridHeader.desc}</p>
        </div>
      )}
      {title && <h3 className="text-xl font-semibold">{title}</h3>}
      <PaginationFilter page={page} limit={limit} total={total} />
      <div className="grid grid-rows-[1fr_auto_auto_auto] grid-cols-[repeat(auto-fill,minmax(12rem,1fr))] gap-3 justify-between">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {products.length <= 0 && (
        <p className="text-center p-4">{emptyText || "No Content"}</p>
      )}
      <PaginationPaging page={page} limit={limit} total={total} />
    </section>
  );
}
