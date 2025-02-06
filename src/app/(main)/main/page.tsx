import React from "react";
import ListeningInterface from "./ListeningInterface";
import isSessionLimitReached, { getUserDetails } from "@/services/users/action";

export default async function Page() {
  const limitReached = await isSessionLimitReached();
  const { user } = await getUserDetails();
  const userName = user.user_metadata.name;
  return <ListeningInterface limitReached={limitReached} userName={userName} />;
}
