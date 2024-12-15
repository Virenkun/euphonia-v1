import AppSidebar from "@/components/sidebar/sidebar";
// import { Separator } from "@/components/ui/separator";
import { SidebarProvider } from "@/components/ui/sidebar";
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
  const { data: userInfoArray } = await supabase.from("user_info").select("*");
  const userInfo = userInfoArray ? userInfoArray[0] : null;

  return (
    <SidebarProvider>
      <AppSidebar email={user?.email} userInfo={userInfo} />
      <main className="flex-1">
        {/* <div className="p-2 ml-3 font-semibold text-gray-600 text-lg">Dashboard</div>
        <Separator className="my-2" /> */}
        {children}
      </main>
    </SidebarProvider>
  );
}
