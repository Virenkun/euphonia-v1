import AppSidebar from "@/components/sidebar/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { createClient } from "@/utils/supabase/server";

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

  return (
    <SidebarProvider>
      <AppSidebar email={user?.email} userInfo={userInfo} />
      <main className="flex-1">
        <SidebarTrigger />
        <div>{children}</div>
      </main>
    </SidebarProvider>
  );
}
