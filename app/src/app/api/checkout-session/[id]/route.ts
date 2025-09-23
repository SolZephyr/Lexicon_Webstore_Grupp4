import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await stripe.checkout.sessions.retrieve(id);

    return NextResponse.json({
      paid: session.payment_status === "paid",
    });
  } catch (error) {
    return NextResponse.json({ paid: false }, { status: 400 });
  }
}