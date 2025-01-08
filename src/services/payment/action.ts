"use server";
import { headers } from "next/headers";
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not defined");
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function CheckoutSession({
  priceId,
  userId,
  planId,
}: {
  priceId: string;
  planId: string;
  userId: string;
}) {
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = headersList.get("x-forwarded-proto");
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${protocol}://${host}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${protocol}://${host}/payment/failed`,
      metadata: {
        userId,
        name: "euphonia",
        planId,
        productName: planId,
      },
    });

    console.log(session);

    return { sessionUrl: session.url };
  } catch (error) {
    console.error(error);
    return { error: "Failed to create session" };
  }
}

export async function GetSubscriptionDetails({
  sessionId,
}: {
  sessionId: string;
}) {
  if (!sessionId) {
    return { error: "Session ID is required" };
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session.payment_intent) {
      return { error: "No subscription found for session" };
    }

    const subscription = await stripe.paymentIntents.retrieve(
      session.payment_intent as string
    );

    if (!session.metadata) {
      return { error: "Session metadata is missing" };
    }
    const productName = session.metadata.productName;
    const amountPaid = subscription.amount_received;

    return {
      productName,
      amountPaid,
    };
  } catch (error: unknown) {
    return { error: (error as Error).message };
  }
}
