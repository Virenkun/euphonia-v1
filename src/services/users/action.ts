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
