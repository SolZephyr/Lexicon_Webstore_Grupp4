"use client";
import { toast } from "sonner";
import { Product, PriceDetails, ProductStock } from "@/lib/types";
import { useState } from "react";
import { useShoppingCart } from "use-shopping-cart";
import { Product as ShoppingCartProduct } from "use-shopping-cart/core";
import { ShoppingBasket } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addItem, cartDetails } = useShoppingCart();
  const [quantity, setQuantity] = useState(1);
  const adjustedPrice = product.discountPercentage
    ? +(
        product.price -
        (product.price * product.discountPercentage) / 100
      ).toFixed(2)
    : product.price;

  const priceDetails: PriceDetails = {
    price: product.price,
    discountPercentage: product.discountPercentage,
    discountedPrice: adjustedPrice,
  };

  const productStock: ProductStock = {
    stock: product.stock,
  };

  const shoppingCartProduct: ShoppingCartProduct = {
    id: product.id,
    name: product.title,
    price: adjustedPrice * 100,
    currency: "USD",
    image: product.thumbnail,
    description: product.description,
    sku: product.sku,
    price_data: priceDetails,
    product_data: productStock,
  };

  const handleAddToCart = () => {
    if (
      cartDetails &&
      cartDetails[product.id] &&
      cartDetails[product.id].quantity + quantity > product.stock
    ) {
      toast.error("Cannot add more items to cart than available in stock.");
      return;
    }

    addItem(shoppingCartProduct, { count: quantity });
    toast.success(`${product.title} added to cart!`);
  };

  return (
    <div className="flex flex-row justify-start items-center gap-4">
      <div className="flex flex-row items-center border rounded bg-white">
        <button
          className="px-4 py-[7px] cursor-pointer bg-accent transition-colors hover:bg-gray-200"
          onClick={() => {
            if (quantity > 1) {
              setQuantity((q) => Math.max(1, q - 1));
            }
          }}
        >
          −
        </button>
        <span className="mx-2 text-md font-medium select-none w-8 text-center">
          {quantity}
        </span>
        <button
          className="px-4 py-[7px] cursor-pointer bg-accent transition-colors hover:bg-gray-200"
          onClick={() => {
            if (quantity < product.stock) {
              setQuantity((q) => Math.min(product.stock, q + 1));
            }
          }}
        >
          +
        </button>
      </div>
      <Button
        onClick={handleAddToCart}
        size="lg"
        className="bg-brand-600 hover:bg-brand-700 text-white rounded text-base font-medium cursor-pointer flex items-center justify-center gap-2 transition-colors"
      >
        <ShoppingBasket />
        Add to Cart
      </Button>
    </div>
  );
}
