export default function ProductPrice({ price, discountPercentage }: { price: number, discountPercentage?: number }) {
    const discountedPrice = discountPercentage
        ? + (price - (price * discountPercentage / 100)).toFixed(2)
        : price;

    return (
        <div className="flex flex-row gap-2 items-center justify-start py-1">
            <p className={`text-lg font-bold ${discountPercentage ? " text-red-600" : ""}`}>${discountedPrice}</p>
            {discountPercentage && (
                <p className="text-sm text-gray-500 line-through">${price}</p>
            )}
        </div>
    );
}
