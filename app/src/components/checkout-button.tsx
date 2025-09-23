"use client";

import { useShoppingCart } from "use-shopping-cart";


export function CheckoutButton() {
    const { cartDetails } = useShoppingCart();
    const items = Object.values(cartDetails ?? {});

    const handleCheckout = async () => {
        try {
            const res = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ items }),
            });

            const data = await res.json();

            if (data.url) {
                window.location.href = data.url; // redirect to Stripe Checkout
            } else {
                console.error("Checkout error:", data.error);
            }
        } catch (err) {
            console.error("Checkout request failed", err);
        }
    };

    return (
        <button
            onClick={handleCheckout}
            className="mt-4 bg-primary-green text-white px-4 py-2 rounded-md disabled:opacity-50 cursor-pointer"
            disabled={!cartDetails || Object.keys(cartDetails).length === 0}
        >
            Checkout
        </button>
    );
}
