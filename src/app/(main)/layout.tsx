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
    .select("*")
    .eq("email", user?.email);
  const userInfo = userInfoArray ? userInfoArray[0] : null;
  const isOnboardingComplete = userInfo?.is_onboarded;

  if (!isOnboardingComplete) {
    redirect("/onboarding-form");
  }

  console.log("userInfo", userInfo);
  console.log("usesssssssr", user);

  return (
    <SidebarProvider>
      <AppSidebar
        email={user?.email}
        avatar={user?.user_metadata?.avatar_url}
        userInfo={userInfo}
      />
      <main className="flex-1">
        {/* <SidebarTrigger /> */}
        <div>{children}</div>
      </main>
    </SidebarProvider>
  );
}
