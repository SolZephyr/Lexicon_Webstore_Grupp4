"use client";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { toast } from "sonner"
import { useShoppingCart } from "use-shopping-cart"
import Link from "next/link";
import { ShoppingBasket } from "lucide-react";
import { cn } from "@/lib/utils";
import { CheckoutButton } from "@/components/checkout-button";


export default function HeaderCartButton() {
    const {
        cartDetails,
        cartCount,
        formattedTotalPrice,
        incrementItem,
        decrementItem,
        removeItem,
    } = useShoppingCart();

    const cartItems = Object.values(cartDetails ?? {})

    return (
        <Sheet>
            <SheetTrigger>
                <div
                    className={cn(
                        "flex flex-row items-center justify-center text-black rounded-md hover:bg-accent cursor-pointer gap-1.5 px-3 md:px-4 py-3"
                    )}
                >
                    <div className="relative flex items-center justify-center rounded-full ">
                        <ShoppingBasket size={28} color="black" />
                        {(cartCount ?? 0) > 0 && (
                            <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary-green text-white text-xs font-bold ">
                                {cartCount ?? 0}
                            </span>
                        )}
                    </div>
                    <div className="hidden md:flex flex-col justify-center text-left">
                        {(cartCount ?? 0) > 0 ? (
                            <>
                                <span className="text-sm font-bold">
                                    {(formattedTotalPrice ??  0 )}
                                </span>
                            </>
                        ) : (
                            <span className="text-sm font-bold">Cart</span>
                        )}
                    </div>
                </div>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-[400px]">
                <SheetHeader>
                    <SheetTitle>Your Cart</SheetTitle>
                </SheetHeader>
                <SheetDescription className="text-center mt-8 text-gray-500">
                    {(cartCount ?? 0) === 0 ?
                        ("Your cart is currently empty.")
                        : null
                    }
                </SheetDescription>
                <div>
                    {cartItems.map((item) => (
                        <div
                            key={item.id}
                            className="flex flex-row items-center border-b py-2 mx-4"
                        >
                            <div className="flex flex-col content-start justify-self-start mr-4">
                                <Link
                                    href={`/products/${item.id}`}
                                    className="font-bold hover:underline mb-1">{item.name}</Link>
                                <div className="flex flex-row items-center border rounded-lg px-4 py-2 bg-white shadow-sm w-fit">
                                    <button className="cursor-pointer"
                                        onClick={() => {
                                            if (item.quantity > 1) {
                                                decrementItem(item.id);
                                                toast.success("Item quantity updated!")
                                            }
                                        }}
                                    >
                                        −
                                    </button>
                                    <span className="mx-4 text-lg font-medium select-none">{item.quantity}</span>
                                    <button className="cursor-pointer"
                                        onClick={() => {
                                            incrementItem(item.id)
                                            toast.success("Item quantity updated!")
                                        }}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-col items-end justify-self-end mr-4 flex-grow">
                                <span className="font-bold">{(item.formattedValue )}</span>
                            </div>
                            <button
                                onClick={() => {
                                    removeItem(item.id)
                                    toast.success("Item removed from cart!")
                                }}
                                className="text-sm text-red-500 hover:underline ">X
                            </button>
                        </div>
                    ))}
                </div>
                <SheetFooter>
                    <div className="flex flex-col content-center justify-center text-center">
                        <span className="text-sm text-gray-500">Total:</span>
                        <span className="font-bold">
                            {formattedTotalPrice ?? "0 US$"}
                        </span>
                        <CheckoutButton />
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
