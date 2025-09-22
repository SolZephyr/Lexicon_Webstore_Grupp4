"use client";

import { useEffect } from "react";
import { useShoppingCart } from "use-shopping-cart";
import { ContentWrapper } from "@/components/content-wrapper";
import Link from "next/link";

export default function SuccessPage() {
  const { clearCart } = useShoppingCart();

  // Clear the cart once on mount
  useEffect(() => {
    clearCart();
  }, []);

  return (
    <ContentWrapper className="flex flex-col items-center justify-center min-h-screen text-center p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">🎉 Payment Successful!</h1>
      <p className="text-lg text-gray-600 mb-8">
        Thank you for your order. Your cart has been cleared.
      </p>
      <Link
        href="/"
        className="bg-primary-green hover:bg-green-700 text-white rounded-xl px-8 py-3 text-base font-medium transition-colors"
      >
        Back to Home
      </Link>
    </ContentWrapper>
  );
}