import { cn } from "@/lib/utils";

export default function ProductPrice({
  price,
  discountPercentage,
}: {
  price: number;
  discountPercentage?: number;
}) {
  const discountedPrice = discountPercentage
    ? +(price - (price * discountPercentage) / 100).toFixed(2)
    : price;

  return (
    <div className={"flex flex-row gap-2 items-center justify-start"}>
      <p
        className={cn(
          "text-lg font-bold",
          discountPercentage ? "text-red-600" : ""
        )}
      >
        ${discountedPrice}
      </p>
      {discountPercentage && (
        <p className="text-sm text-muted-foreground line-through">
          ${price}
        </p>
      )}
    </div>
  );
}
