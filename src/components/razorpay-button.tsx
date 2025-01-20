import { createOrder } from "@/services/razorpay/action";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import { getUserInfo } from "@/services/users/action";

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  image?: string;
  order_id: string;
  handler: (response: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }) => void;
  prefill: {
    name: string;
    email: string;
    contact: string | null;
  };
  notes: {
    [key: string]: string;
  };
  theme: {
    color: string;
  };
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => {
      open: () => void;
    };
  }
}

export default function RazorpayButton({
  amount,
  currency,
  productId,
  productName,
}: {
  amount: number;
  currency: string;
  productId: string;
  productName: string;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const loadScript = (src: string) =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handlePayment = async () => {
    const isLoaded = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!isLoaded) {
      alert("Razorpay SDK failed to load. Check your internet connection.");
      return;
    }

    setLoading(true);
    const userDetails = await getUserInfo();
    console.log("user", userDetails);

    try {
      const order = await createOrder({
        amount: amount,
        currency: currency,
      });

      if (!order) {
        throw new Error("Failed to create order");
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
        amount: Number(order.amount),
        currency: order.currency,
        name: "Euphonia",
        description: "Test Transaction",
        image: "/white_logo.png",
        order_id: order.id,
        handler: (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) => {
          router.push(
            `/payment/success?session_id=${response.razorpay_payment_id}`
          );
        },
        prefill: {
          name: userDetails?.name || "",
          email: userDetails?.email || "",
          contact: userDetails?.phone || null,
        },
        notes: {
          authId: userDetails?.auth_id || "",
          product: "Euphonia",
          productId: productId,
          productName: productName,
        },
        theme: { color: "#4B4ACF" },
        modal: {
          ondismiss: () => {
            router.push("/payment/failed");
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      alert("Failed to initiate payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handlePayment}
      disabled={loading}
      className="h-12 w-full bg-[#4B4ACF] text-white text-lg font-semibold hover:bg-[#4B4AEF]"
    >
      {loading ? "Loading..." : "Subscribe"}
    </Button>
  );
}
