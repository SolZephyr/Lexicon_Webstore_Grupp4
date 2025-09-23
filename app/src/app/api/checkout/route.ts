import Stripe from "stripe";
import { NextResponse } from "next/server";
import { Product } from "use-shopping-cart/core";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const { items } = (await req.json()) as { items: Product[] }; // items from your external API/cart

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: items.map((item) => ({
        price_data: {
          currency: "usd",
          unit_amount: item.price, // price in cents
          product_data: {
            name: item.name,
            description: item.description,
            images: [item.image || ""],
          },
        },
        quantity: item.quantity,
      })),
      success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/?canceled=true`,
    });

    return NextResponse.json({ id: session.id, url: session.url });
  } catch (error) {
    console.error("Stripe Checkout error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
