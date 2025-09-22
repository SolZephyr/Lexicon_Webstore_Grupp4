"use client";

import { useEffect, useState } from "react";
import { useShoppingCart } from "use-shopping-cart";

export default function ClearCart({ children }: { children: React.ReactNode }) {
  const { clearCart } = useShoppingCart();
  const [done, setDone] = useState(false);

  useEffect(() => {
    clearCart();
    localStorage.removeItem("persist:root");
    setDone(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!done) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <p className="text-lg text-gray-600 animate-pulse">
          Verifying your payment...
        </p>
      </div>
    );
  }

  return <>{children}</>;
}