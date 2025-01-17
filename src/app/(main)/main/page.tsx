import React from "react";
import ListeningInterface from "./ListeningInterface";
import isSessionLimitReached from "@/services/users/action";

export default async function Page() {
  const limitReached = await isSessionLimitReached();
  return <ListeningInterface limitReached={limitReached} />;
}
