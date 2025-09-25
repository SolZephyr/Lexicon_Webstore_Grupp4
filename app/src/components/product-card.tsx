import { ThinProduct } from "@/lib/types";
import Image from "next/image";
import ProductPrice from "./product-price";
import StockStatus from "./stock-status";
import Link from "next/link";

export default function ProductCard({ product }: { product: ThinProduct }) {
  return (
    <article className="contents">
      <Link
        href={`/products/${product.id}`}
        className="grid grid-rows-subgrid gap-1 row-span-5 py-2 px-4 border border-white focus-within:border-gray-300 hover:border-gray-300 "
      >
        <div className="flex flex-col items-center gap-3">
          <Image
            src={product.thumbnail ?? "/placeholder-image.svg"}
            alt={product.title}
            className="w-full object-cover rounded"
            priority
            width={300}
            height={300}
          />
          <p className="text-sm text-gray-500 py-2">{product.rating} ⭐</p>
        </div>
        <h2 className="text-md font-semibold">{product.title}</h2>

        <ProductPrice
          price={product.price}
          discountPercentage={product.discountPercentage}
        />

        <StockStatus availabilityStatus={product.availabilityStatus} />
      </Link>
    </article>
  );
}
