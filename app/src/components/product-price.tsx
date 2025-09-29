import { cn } from "@/lib/utils";

export default function ProductPrice({
  price,
  discountPercentage,
}: {
  price: number;
  discountPercentage?: number;
}) {
  const hasDiscount =
    discountPercentage !== undefined && discountPercentage > 0;
  const discountedPrice = hasDiscount
    ? +(price - (price * discountPercentage!) / 100).toFixed(2)
    : price;

  return (
    <div className={"flex flex-row gap-2 items-center justify-start"}>
      <h3 className={cn("text-lg font-bold", hasDiscount ? "text-red-600" : "")}>
        ${discountedPrice}
      </h3>
      {hasDiscount && (
        <h3 className="text-sm text-muted-foreground line-through">${price}</h3>
      )}
    </div>
  );
}
