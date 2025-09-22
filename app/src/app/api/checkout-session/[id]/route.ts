import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await stripe.checkout.sessions.retrieve(params.id);

    return NextResponse.json({
      paid: session.payment_status === "paid",
    });
  } catch (err) {
    return NextResponse.json({ paid: false }, { status: 400 });
  }
}