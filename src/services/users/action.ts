"use server";
import { createClient } from "@/utils/supabase/server";

interface PaymentDetails {
  order_id: string;
  payment_id: string;
  email: string;
  card: Record<string, string> | undefined;
  card_id: string | null;
  bank: string;
  currency: string;
  amount: string | number;
  international: boolean;
  method: string;
  wallet: string | null;
  status: string;
  notes: Record<string, string>;
  invoice_id: string | null;
}

export const getUserDetails = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(`Supabase Error: ${error.message}`);
  }
  return data;
};

export const getUserInfo = async () => {
  const supabase = await createClient();
  const userDetails = await getUserDetails();
  const { data, error } = await supabase
    .from("user_info")
    .select("*")
    .eq("auth_id", userDetails.user.id)
    .single();

  if (error) {
    throw new Error(`Supabase Error: ${error.message}`);
  }
  return data;
};

export const deleteUser = async () => {
  const supabase = await createClient();
  const { error } = await supabase.rpc("delete_user");
  if (error) {
    console.error(`Supabase Error: ${error.message}`);
  } else {
    console.log("User deleted successfully");
  }
};

export const getBillingDetails = async () => {
  const supabase = await createClient();
  const {
    data: { user },
    error: getUserError,
  } = await supabase.auth.getUser();

  if (getUserError) {
    console.log(getUserError, "getUserError");
  }

  if (!user) {
    console.log("User not found");
  }
  if (user) {
    const { data: user_data, error: user_error } = await supabase
      .from("user_info")
      .select("*,plan(*)")
      .eq("auth_id", user.id)
      .single();

    if (user_error) {
      console.log(user_error, "user_error");
    }

    if (!user_data) {
      console.log("User data not found");
    }
    return { plan: user_data.plan };
  } else {
    console.log("User not found");
  }
};

export default async function isSessionLimitReached() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: userInfoArray } = await supabase
    .from("user_info")
    .select(`*,plan(*)`)
    .eq("email", user?.email);
  const userInfo = userInfoArray ? userInfoArray[0] : null;
  const { data: session_count, error } = await supabase.rpc(
    "count_unique_sessions"
  );

  if (error) {
    console.error("Error While Getting Session Count", error);
  }

  const allotedSessions = userInfo?.plan?.features?.sessions;
  const usedSessions = session_count;

  if (usedSessions >= allotedSessions) {
    return true;
  } else {
    return false;
  }
}

export async function savePaymentDetails({
  order_id,
  payment_id,
  email,
  card,
  card_id,
  bank,
  currency,
  amount,
  international,
  method,
  wallet,
  status,
  notes,
  invoice_id,
}: PaymentDetails) {
  const supabase = await createClient();

  const is_payment_exists = await supabase
    .from("payment")
    .select("*")
    .eq("payment_id", payment_id);

  if (is_payment_exists.data) {
    console.log("Payment already exists");
    return;
  }

  const { error } = await supabase.from("payment").insert([
    {
      order_id,
      payment_id,
      email,
      card,
      card_id,
      bank,
      currency,
      amount,
      international,
      method,
      wallet,
      status,
      notes,
      invoice_id,
    },
  ]);

  if (error) {
    console.error("Error saving payment details:", error.message);
    return { error: "Failed to save payment details" };
  }
  console.log("Payment details saved successfully");
}
