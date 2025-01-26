import AppSidebar from "@/components/sidebar/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getReferInfo } from "@/services/users/action";
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

  const referInfo = await getReferInfo();

  const isOnboardingComplete = userInfo?.is_onboarded;

  if (!isOnboardingComplete) {
    redirect("/onboarding-form");
  }

  return (
    <SidebarProvider>
      <AppSidebar
        email={user?.email}
        avatar={user?.user_metadata?.avatar_url}
        userInfo={userInfo}
        planName={userInfo?.plan?.name}
        allotedSessions={userInfo?.plan?.features?.sessions}
        usedSessions={userInfo.session_used}
        features={userInfo?.plan?.features}
        referInfo={referInfo}
      />
      <main className="flex-1">
        <div>{children}</div>
      </main>
    </SidebarProvider>
  );
}
