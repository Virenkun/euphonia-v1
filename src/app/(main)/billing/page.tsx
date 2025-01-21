import BillingPage from "@/components/Billing/BillingPage";
import { getBillingDetails, getPaymentList } from "@/services/users/action";
import { createClient } from "@/utils/supabase/server";
import React from "react";

async function Page() {
  const supabase = await createClient();
  const currentPlan = await getBillingDetails();
  const paymentList = await getPaymentList();
  const { data: sessionsUsed } = await supabase.rpc("count_unique_sessions");
  const { data: allPlans } = await supabase.from("pricing").select("*");
  return (
    <BillingPage
      currentPlan={currentPlan?.plan}
      sessionUsed={sessionsUsed}
      allPlans={allPlans || []}
      paymentList={Array.isArray(paymentList) ? paymentList : []}
    />
  );
}

export default Page;
