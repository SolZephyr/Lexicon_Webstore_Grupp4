"use client"
import { toast } from "sonner"
import { Product, PriceDetails, ProductStock } from "@/lib/types"
import { useState } from "react";
import { useShoppingCart } from "use-shopping-cart";
import { Product as ShoppingCartProduct } from "use-shopping-cart/core";

export default function AddToCartButton({ product }: { product: Product }) {
    const { addItem, cartDetails } = useShoppingCart();
    const [quantity, setQuantity] = useState(1);
    const adjustedPrice = product.discountPercentage
        ? + (product.price - (product.price * product.discountPercentage / 100)).toFixed(2)
        : product.price;

    const priceDetails: PriceDetails = {
        price: product.price,
        discountPercentage: product.discountPercentage,
        discountedPrice: adjustedPrice
    }

    const productStock: ProductStock = {
        stock: product.stock
    }

    const shoppingCartProduct: ShoppingCartProduct = {
        id: product.id,
        name: product.title,
        price: adjustedPrice * 100,
        currency: "USD",
        image: product.thumbnail,
        description: product.description,
        sku: product.sku,
        price_data: priceDetails,
        product_data: productStock
    }

    const handleAddToCart = () => {
        if (cartDetails && cartDetails[product.id] && cartDetails[product.id].quantity + quantity > product.stock) {
            toast.error("Cannot add more items to cart than available in stock.")
            return;
        }

        addItem(
            shoppingCartProduct,
            { count: quantity }
        )
        toast.success(`${product.title} added to cart!`)
    }

    return (
        <div className="flex flex-row justify-start items-center gap-4 mt-2 mb-2">
            <div className="flex flex-row items-center border rounded-lg px-4 py-2 bg-white shadow-sm">
                <button
                    onClick={() => {
                        if (quantity > 1) {
                            setQuantity((q) => Math.max(1, q - 1));
                        }
                    }}
                >
                    −
                </button>
                <span className="mx-4 text-lg font-medium select-none">{quantity}</span>
                <button
                    onClick={() => {
                        if (quantity < product.stock) {
                            setQuantity((q) => Math.min(product.stock, q + 1))
                        }
                    }}
                >
                    +
                </button>
            </div>
            <button
                onClick={
                    handleAddToCart
                }
                className="bg-primary-green hover:bg-primary-green/80 text-white rounded-xl px-12 py-4 text-base font-medium cursor-pointer flex items-center justify-center gap-2 transition-colors"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2zM7.16 16h9.45c.75 0 1.41-.41 1.75-1.03l3.24-6.16A1 1 0 0 0 21.7 7H6.21l-.94-2H2v2h2l3.6 7.59-1.35 2.44C5.16 17.37 5.76 18 6.5 18h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63z" />
                </svg>
                Add to Cart
            </button>
        </div>

    )
}
