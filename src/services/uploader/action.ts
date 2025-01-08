"use server";

import { createClient } from "@/utils/supabase/server";

export const uploadProfilePicture = async (
  file: File
): Promise<{
  signedUrl: string;
  fileName: string;
} | null> => {
  const supabase = await createClient();
  const fileName = `${Date.now()}-${file.name}`;
  const { data, error } = await supabase.storage
    .from("euphonia")
    .upload(fileName, file);

  if (error) {
    console.error("Error uploading file:", error.message);
    return null;
  }
  console.log("Sucessfully Uploaded", data);

  const { data: publicUrl, error: signedUrlError } = await supabase.storage
    .from("euphonia")
    .createSignedUrl(fileName, 36000);

  if (publicUrl) {
    return { signedUrl: publicUrl.signedUrl, fileName };
  } else {
    console.error("Error creating signed URL", signedUrlError);
    return null;
  }
};

export const deleteProfilePicture = async (fileName: string) => {
  const supabase = await createClient();
  const { error } = await supabase.storage.from("euphonia").remove([fileName]);

  if (error) {
    console.error("Error deleting file:", error.message);
  } else {
    console.log("Deleted file", fileName);
  }
};
