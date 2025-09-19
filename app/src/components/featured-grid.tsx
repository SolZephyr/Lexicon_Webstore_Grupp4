"use client";
import { ThinProduct } from "@/lib/types";
import ProductCard from "./product-card";
import { use } from "react";

export default function FeaturedGrid({
  productsTask,
  className,
}: {
  productsTask: Promise<ThinProduct[]>;
} & React.ComponentProps<"div">) {
  const data = use(productsTask);
  return (
    <div className={`flex flex-col gap-4 ${className || ""}`}>
      <h2 className="text-3xl font-bold">Featured Products</h2>
      <div className="grid grid-rows-[1fr_auto_auto_auto] grid-cols-[repeat(auto-fill,minmax(13rem,1fr))] gap-3 justify-between">
        {data.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
