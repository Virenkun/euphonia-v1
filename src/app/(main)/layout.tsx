import AppSidebar from "@/components/sidebar/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import {
  getReferInfo,
  getUserDetails,
  getUserInfo,
} from "@/services/users/action";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await getUserDetails();
  const userInfo = await getUserInfo();

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
        allotedSessions={userInfo?.alloted_sessions}
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
