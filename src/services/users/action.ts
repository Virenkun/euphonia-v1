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
