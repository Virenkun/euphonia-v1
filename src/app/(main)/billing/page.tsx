import BillingPage from "@/components/Billing/BillingPage";
import {
  getBillingDetails,
  getPaymentList,
  getUserInfo,
} from "@/services/users/action";
import { createClient } from "@/utils/supabase/server";
import React from "react";

async function Page() {
  const supabase = await createClient();
  const currentPlan = await getBillingDetails();
  const paymentList = await getPaymentList();
  const userInfo = await getUserInfo();
  const { data: allPlans } = await supabase.from("pricing").select("*");
  return (
    <BillingPage
      currentPlan={currentPlan?.plan}
      sessionUsed={userInfo?.session_used}
      allotedSessions={userInfo?.alloted_sessions}
      allPlans={allPlans || []}
      paymentList={Array.isArray(paymentList) ? paymentList : []}
    />
  );
}

export default Page;
