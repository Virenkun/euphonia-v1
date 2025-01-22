"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

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

interface UserInfoUpdate {
  name?: string;
  age?: number;
  email?: string;
  phone?: string;
  communication_style?: string;
  primary_goals?: string;
  interest?: string;
  avatar?: string;
  sessions?: null;
  subscription?: string;
  is_onboarded?: boolean;
  auth_id?: string;
  country?: string;
  preferred_language?: string;
  notification_frequency?: string;
  required_cookies?: boolean;
  analytics_cookies?: boolean;
}

export const updateUserInfo = async (values: UserInfoUpdate) => {
  const supabase = await createClient();
  const userInfo = await getUserInfo();
  const { error } = await supabase
    .from("user_info")
    .update(values)
    .eq("auth_id", userInfo?.auth_id);
  if (error) {
    console.error("Error Updating User");
    return;
  }
  revalidatePath("/", "layout");
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
  console.log(is_payment_exists, "is_payment_exists");

  if (is_payment_exists.count) {
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
      auth_id: notes.authId,
      is_current: true,
    },
  ]);

  if (error) {
    console.error("Error saving payment details:", error.message);
    return { error: "Failed to save payment details" };
  }
  console.log("Payment details saved successfully");
}

export async function getPaymentList() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) {
    console.error("Error in auth user");
    return;
  }

  if (!user) {
    console.error("User not found");
    return;
  }

  const { data, error: paymentFetchError } = await supabase
    .from("payment")
    .select("*")
    .eq("auth_id", user.id);

  if (paymentFetchError) {
    console.error("Error fetching payment details:", paymentFetchError.message);
    return { error: "Failed to fetch payment details" };
  }
  console.log("data", data);
  return data;
}
