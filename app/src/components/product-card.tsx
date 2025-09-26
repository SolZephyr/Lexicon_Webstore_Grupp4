import { ThinProduct } from "@/lib/types";
import Image from "next/image";
import ProductPrice from "./product-price";
import StockStatus from "./stock-status";
import Link from "next/link";
import { Star, StarHalf } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function ProductCard({ product }: { product: ThinProduct }) {
  return (
    <article className="contents">
      <Link
        href={`/products/${product.id}`}
        className="grid grid-rows-subgrid gap-1 row-span-4 focus-within:border-gray-300 hover:border-gray-100 transition-colors rounded group"
      >
        <div className="relative flex justify-center items-center bg-accent rounded">
          {product.discountPercentage > 0 && (
            <div className="absolute top-2 left-2">
              <Badge
                variant="destructive"
                className="rounded px-2 py-1 text-xs font-semibold"
              >
                -{Math.round(product.discountPercentage)}%
              </Badge>
            </div>
          )}
          <Image
            src={product.thumbnail ?? "/placeholder-image.svg"}
            alt={product.title}
            className="w-full object-cover rounded p-4 group-hover:scale-[1.02] transition-all"
            priority
            width={300}
            height={300}
          />
        </div>
        <div className="flex justify-between items-center px-2 py-1">
          <Rating rating={product.rating} />
          <StockStatus amount={product.stock} showTooltip/>
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

function Rating({ rating }: { rating: number }) {
  const safeRating = Math.max(0, Math.min(5, rating));

  if (safeRating === 0) {
    return <span className="text-xs text-muted-foreground">No Rating</span>;
  }

  const fullStars = Math.floor(safeRating);
  const hasHalf = safeRating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-0.5 text-yellow-500  py-2">
            {/* full stars */}
            {[...Array(fullStars)].map((_, i) => (
              <Star key={`full-${i}`} size={16} fill="currentColor" strokeWidth={0} />
            ))}

            {/* half star with background */}
            {hasHalf && (
              <div className="relative w-4 h-4">
                {/* empty star behind */}
                <Star
                  size={16}
                  fill="none"
                  strokeWidth={1.5}
                  className="absolute top-0 left-0"
                />
                {/* half star on top */}
                <StarHalf
                  size={16}
                  fill="currentColor"
                  strokeWidth={0}
                  className="absolute top-0 left-0"
                />
              </div>
            )}

            {/* empty stars */}
            {[...Array(emptyStars)].map((_, i) => (
              <Star key={`empty-${i}`} size={16} fill="none" strokeWidth={1.5} />
            ))}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{safeRating.toFixed(1)} / 5</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
