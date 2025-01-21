import Dashboard from "@/components/Dashboard/DashboardPage";
import { GetDashboardData } from "@/services/dashboard/action";
import React from "react";

export default async function Page() {
  const response = await GetDashboardData();

  return <Dashboard dashboardData={response} />;
}
