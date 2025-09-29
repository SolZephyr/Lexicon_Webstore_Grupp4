import { ThinProduct } from "@/lib/types";
import Image from "next/image";
import ProductPrice from "./product-price";
import StockStatus from "./stock-status";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import ProductRating from "@/components/product-rating";

export default function ProductCard({ product }: { product: ThinProduct }) {
  return (
    <article className="contents">
      <Link
        href={`/products/${product.id}`}
        className="grid grid-rows-subgrid gap-1 row-span-4 focus-within:border-gray-300 transition-colors rounded group"
      >
        <div className="relative flex justify-center items-center bg-accent rounded">
          {product.discountPercentage > 0 && (
            <Badge
              variant="destructive"
              className="rounded px-2 py-1 text-xs font-semibold absolute top-2 left-2 z-50"
            >
              -{Math.round(product.discountPercentage)}%
            </Badge>
          )}
          <Image
            src={product.thumbnail ?? "/placeholder-image.svg"}
            alt={product.title}
            className="w-full object-cover rounded p-4 group-hover:scale-[1.02] transition-transform"
            priority
            width={300}
            height={300}
          />
        </div>
        <div className="flex justify-between items-center px-2 py-1">
          <ProductRating rating={product.rating} showTooltip/>
          <StockStatus amount={product.stock} showTooltip />
        </div>
        <h2 className="text-md font-semibold px-2 py-1">{product.title}</h2>
        <div className="px-2 pt-1 pb-3">
          <ProductPrice
            price={product.price}
            discountPercentage={product.discountPercentage}
          />
        </div>
      </Link>
    </article>
  );
}

