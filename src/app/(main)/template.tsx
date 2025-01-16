"use client";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import React from "react";

function Template({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isMobile = useIsMobile();
  return (
    <div>
      {isMobile && <SidebarTrigger />}
      {children}
    </div>
  );
}

export default Template;
