"use client";
import NoInternetProvider from "@/provider/NoInternetProvider";
import React from "react";

function Template({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <NoInternetProvider>{children}</NoInternetProvider>;
}

export default Template;
