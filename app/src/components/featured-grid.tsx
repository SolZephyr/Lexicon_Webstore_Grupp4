"use client";
import { ThinProduct } from "@/lib/types";
import ProductCard from "./product-card";
import { use } from "react";

export default function FeaturedGrid({
  products,
  productsTask,
  className,
}: {
  products?: ThinProduct[];
  productsTask?: Promise<ThinProduct[]>;
} & React.ComponentProps<"div">) {
  const data = products ?? (productsTask && use(productsTask));
  return (
    <div className={`flex flex-col gap-4 ${className || ""}`}>
      <div className="flex">
        <h2 className="text-xl font-bold border-b-brand-600 border-b-2">
          Featured Products
        </h2>
      </div>
      <div className="grid grid-rows-[1fr_auto_auto_auto] grid-cols-[repeat(auto-fill,minmax(13rem,1fr))] gap-3 justify-between">
        {data?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
