"use client";
import { ThinProduct } from "@/lib/types";
import ProductCard from "./product-card";
import { use } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

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
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold border-b-brand-600 border-b-2 pb-1">
          Featured Products
        </h2>
        <Link
          href={"/products"}
          className="flex items-center gap-1 text-sm rounded hover:bg-accent px-2 py-1"
        >
          View all <ChevronRight size={14} />
        </Link>
      </div>
      <div className="grid grid-rows-[1fr_auto_auto_auto] grid-cols-[repeat(auto-fill,minmax(13rem,1fr))] gap-3 justify-between">
        {data?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
