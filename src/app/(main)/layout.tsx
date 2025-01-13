import AppSidebar from "@/components/sidebar/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
    "count_unique_sessions",
    {
      input_user_id: userInfo?.auth_id,
    }
  );

  if (error) {
    console.error("Error While Getting Session Count", error);
  }

  const isOnboardingComplete = userInfo?.is_onboarded;

  if (!isOnboardingComplete) {
    redirect("/onboarding-form");
  }

  console.log("User Info", userInfo);

  return (
    <SidebarProvider>
      <AppSidebar
        email={user?.email}
        avatar={user?.user_metadata?.avatar_url}
        userInfo={userInfo}
        planName={userInfo?.plan?.name}
        allotedSessions={userInfo?.plan?.features?.sessions}
        usedSessions={session_count}
      />
      <main className="flex-1">
        {/* <SidebarTrigger /> */}
        <div>{children}</div>
      </main>
    </SidebarProvider>
  );
}
