"use server";
import { createClient } from "@/utils/supabase/server";

export const getUserDetails = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

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
