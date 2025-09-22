import Stripe from "stripe";
import Link from "next/link";
import { redirect } from "next/navigation";
import ClearCart from "@/components/clear-cart";
import { ContentWrapper } from "@/components/content-wrapper";
interface SuccessPageProps {
  searchParams: { session_id?: string };
}

export default async function SuccessPage(props: { searchParams: Promise<{ session_id?: string }> }) {
  const searchParams = await props.searchParams;
  const sessionId = searchParams.session_id;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  if (!sessionId) {
    redirect("/");
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      redirect("/");
    }
  } catch (err) {
    console.error("Error retrieving Stripe session:", err);
    redirect("/");
  }

  return (
    <ContentWrapper >
      <ClearCart>
        <div className="flex flex-col items-center justify-center py-20 px-4">
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
        </div>
      </ClearCart>
    </ContentWrapper>
  );
}
