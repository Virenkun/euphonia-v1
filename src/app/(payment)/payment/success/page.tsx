"use client";

import { GetSubscriptionDetails } from "@/services/payment/action";
import { useEffect, useState } from "react";
import { CheckCircle, AlertCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { getUserDetails } from "@/services/users/action";
import { createClient } from "@/utils/supabase/client";

export default function SuccessPage() {
  const [loading, setLoading] = useState(true);
  const [subscriptionData, setSubscriptionData] = useState<{
    productName: string;
    amountPaid: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubscriptionDetails = async () => {
      const sessionId = new URLSearchParams(window.location.search).get(
        "session_id"
      );

      if (!sessionId) {
        setError("Session ID not found");
        setLoading(false);
        return;
      }

      try {
        const response: {
          productName?: string;
          amountPaid?: number;
          error?: string;
        } = await GetSubscriptionDetails({ sessionId });

        if (response.productName && response.amountPaid) {
          const data = await getUserDetails();
          const supabase = createClient();
          const { error } = await supabase
            .from("user_info")
            .update({
              plan: response.productName,
            })
            .match({ auth_id: data.user.id });

          if (error) {
            console.error("Error updating user plan:", error.message);
            setError("Failed to update user plan");
          }

          setSubscriptionData({
            productName: response.productName,
            amountPaid: response.amountPaid,
          });
        } else if (response.error) {
          setError(response.error);
        }
      } catch (err: unknown) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptionDetails();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#4B4ACF] to-[#7A79FF]">
        <div className="w-16 h-16 border-4 border-t-4 border-white rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#4B4ACF] to-[#7A79FF]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4"
      >
        {error ? (
          <div className="text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Oops! Something went wrong
            </h1>
            <p className="text-gray-600">{error}</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <div className="bg-[#4B4ACF] rounded-full p-3 inline-block mb-4">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Payment Successful!
              </h1>
              <p className="text-gray-600">Thank you for your subscription.</p>
            </div>
            {subscriptionData && (
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-[#F0F0FF] to-[#E6E6FF] p-4 rounded-lg">
                  <p className="text-sm text-[#4B4ACF] font-semibold">
                    Product
                  </p>
                  <p className="text-lg font-bold text-gray-800">
                    {subscriptionData.productName}
                  </p>
                </div>
                <div className="bg-gradient-to-r from-[#F0F0FF] to-[#E6E6FF] p-4 rounded-lg">
                  <p className="text-sm text-[#4B4ACF] font-semibold">
                    Amount Paid
                  </p>
                  <p className="text-lg font-bold text-gray-800">
                    ${subscriptionData.amountPaid.toFixed(2)}
                  </p>
                </div>
              </div>
            )}
            <button
              className="mt-8 w-full bg-gradient-to-r from-[#4B4ACF] to-[#7A79FF] text-white py-3 px-4 rounded-lg font-semibold hover:from-[#3F3EAB] hover:to-[#6968D9] transition-all duration-300 flex items-center justify-center"
              onClick={() => (window.location.href = "/dashboard")}
            >
              Go to Dashboard
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </>
        )}
      </motion.div>
    </div>
  );
}
