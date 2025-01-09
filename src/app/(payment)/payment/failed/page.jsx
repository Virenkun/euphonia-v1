"use client";

import { useEffect, useState } from "react";
import { XCircle, AlertTriangle, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function FailedPage() {
  const [error, setError] = useState("An unknown error occurred");

  useEffect(() => {
    const errorMessage = new URLSearchParams(window.location.search).get(
      "error"
    );
    setError(errorMessage || "An unknown error occurred");
  }, [setError]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#4B4ACF] to-[#7A79FF]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4"
      >
        <div className="text-center mb-6">
          <div className="bg-red-500 rounded-full p-3 inline-block mb-4">
            <XCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Payment Failed
          </h1>
          <p className="text-gray-600">
            {`We're sorry, but there was an issue processing your payment.`}
          </p>
        </div>

        <div className="bg-gradient-to-r from-[#FFF0F0] to-[#FFE6E6] p-4 rounded-lg mb-6">
          <div className="flex items-start">
            <AlertTriangle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-gray-700">{error}</p>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            {`Don't worry, your account has not been charged. Here are some things you can try:`}
          </p>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
            <li>Check your payment details and try again</li>
            <li>Ensure you have sufficient funds in your account</li>
            <li>Try a different payment method</li>
            <li>Contact your bank if the issue persists</li>
          </ul>
        </div>

        <Link
          href="/checkout"
          className="mt-8 w-full bg-gradient-to-r from-[#4B4ACF] to-[#7A79FF] text-white py-3 px-4 rounded-lg font-semibold hover:from-[#3F3EAB] hover:to-[#6968D9] transition-all duration-300 flex items-center justify-center"
        >
          <ArrowLeft className="mr-2 w-5 h-5" />
          Return to Checkout
        </Link>
      </motion.div>
    </div>
  );
}
