"use server";
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not defined");
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function CheckoutSession({
  planId,
  userId,
}: {
  planId: string;
  userId: string;
}) {
  try {
    let priceId;

    // Map planId to Stripe price IDs
    switch (planId) {
      case "Melody":
        priceId = "price_1QextqRvCtMaecfigyPOSkpO"; // Replace with your Stripe price ID for "Melody"
        break;
      case "Symphony":
        priceId = "price_1QextqRvCtMaecfigyPOSkpO"; // Replace with your Stripe price ID for "Symphony"
        break;
      default:
        return { error: "Invalid plan" };
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `http://locahost:3000/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://locahost:3000/cancel`,
      metadata: {
        userId, // Include user ID for post-payment handling
      },
    });

    console.log(session);

    return { sessionUrl: session.url };
  } catch (error) {
    console.error(error);
    return { error: "Failed to create session" };
  }
}
