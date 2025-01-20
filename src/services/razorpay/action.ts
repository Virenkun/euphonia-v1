"use server";
import Razorpay from "razorpay";

interface createOrderProps {
  amount: number;
  currency: string;
}

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "",
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function createOrder({ amount, currency }: createOrderProps) {
  try {
    const options = {
      amount: amount * 100,
      currency: currency || "INR",
      receipt: `receipt_${new Date().getTime()}`,
    };

    const order = await razorpay.orders.create(options);
    console.log("Order Created Successfully", order);
    return order;
  } catch (error) {
    console.error(error);
  }
}

export async function getPaymentDetails({ paymentId }: { paymentId: string }) {
  if (!paymentId) {
    console.error("Payment Id Required");
    return;
  }

  try {
    const paymentDetails = await razorpay.payments.fetch(paymentId);

    return paymentDetails;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching payment details:", error.message);
    } else {
      console.error("Error fetching payment details:", error);
    }
  }
}

export async function getOrderDetails({ orderId }: { orderId: string }) {
  if (!orderId) {
    console.error("Order Id Required");
    return;
  }

  try {
    const orderDetails = await razorpay.orders.fetch(orderId);

    return orderDetails;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching order details:", error.message);
    } else {
      console.error("Error fetching order details:", error);
    }
  }
}

export async function createSubscription({
  planId,
  userId,
  total_count,
}: {
  planId: string;
  userId: string;
  total_count: number;
}) {
  try {
    const subscription = await razorpay.subscriptions.create({
      plan_id: planId,
      total_count: total_count,
      customer_notify: 1,
      start_at: Math.floor(Date.now() / 1000),
      notes: {
        userId,
      },
    });

    console.log("Subscription Created Successfully", subscription);
    return subscription;
  } catch (error) {
    console.error(error);
  }
}
