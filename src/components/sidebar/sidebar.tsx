"use client";

import {
  BadgeCheck,
  Bell,
  BookOpen,
  Bot,
  ChevronsUpDown,
  CreditCard,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  HandHeart,
  MessageCircleHeart,
  Send,
  Settings2,
  Sparkles,
  SquareTerminal,
  TentTree,
  MessageCircleMore,
  GraduationCap,
  Crown,
  BellDot,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { useState } from "react";
import { AccountModal } from "../account/account-modal";
import { NotificationModal } from "../account/notification-modal";
import { FeedbackModal } from "../account/feedback-modal";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { SupportModal } from "../account/support-modal";
import { fetchModuleAccess } from "@/utils/utils-functions";

interface AppSidebarProps {
  email: string | undefined;
  userInfo: {
    name?: string;
    age?: number;
    communication_style?: string;
    primary_goals?: string;
    interest?: string;
    avatar?: string;
    sessions?: null;
    subscription?: string;
    is_onboarded?: boolean;
    auth_id: string;
  } | null;
  avatar: string | undefined;
  planName: string | undefined;
  allotedSessions: number | undefined;
  usedSessions: number;
  features: {
    sessions: number;
    dashboardAccess: boolean;
    chatHistoryAccess: boolean;
    aiResourceAccess: boolean;
    professionalTherapistAccess: boolean;
    aiCheckInAccess: boolean;
  };
}

export default function AppSidebar({
  email,
  userInfo,
  avatar,
  planName,
  allotedSessions,
  usedSessions,
  features,
}: Readonly<AppSidebarProps>) {
  const currentFeatures = fetchModuleAccess(features);

  const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
      {
        title: "Playground",
        url: "#",
        icon: SquareTerminal,
        isActive: true,
        items: [
          {
            title: "History",
            url: "#",
          },
          {
            title: "Starred",
            url: "#",
          },
          {
            title: "Settings",
            url: "#",
          },
        ],
      },
      {
        title: "Models",
        url: "#",
        icon: Bot,
        items: [
          {
            title: "Genesis",
            url: "#",
          },
          {
            title: "Explorer",
            url: "#",
          },
          {
            title: "Quantum",
            url: "#",
          },
        ],
      },
      {
        title: "Documentation",
        url: "#",
        icon: BookOpen,
        items: [
          {
            title: "Introduction",
            url: "#",
          },
          {
            title: "Get Started",
            url: "#",
          },
          {
            title: "Tutorials",
            url: "#",
          },
          {
            title: "Changelog",
            url: "#",
          },
        ],
      },
      {
        title: "Settings",
        url: "#",
        icon: Settings2,
        items: [
          {
            title: "General",
            url: "#",
          },
          {
            title: "Team",
            url: "#",
          },
          {
            title: "Billing",
            url: "#",
          },
          {
            title: "Limits",
            url: "#",
          },
        ],
      },
    ],
    navSecondary: [
      {
        title: "Support",
        url: "#",
        icon: LifeBuoy,
        onClick: () => setIsSupportModalOpen(true),
      },
      {
        title: "Feedback",
        url: "#",
        icon: Send,
        onClick: () => setIsFeedbackModalOpen(true),
      },
    ],
    projects: [
      {
        name: "Therapy Sessions",
        url: "/main",
        icon: MessageCircleHeart,
        isPremium: false,
        code: "sessions",
      },
      {
        name: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
        isPremium: false,
        code: "dashboardAccess",
      },
      {
        name: "Professional Therapist",
        url: "/professional-therapist",
        icon: GraduationCap,
        isPremium: false,
        code: "professionalTherapistAccess",
      },
      {
        name: "Resources",
        url: "/resources",
        icon: TentTree,
        isPremium: false,
        code: "aiResourceAccess",
      },
      {
        name: "Chat History",
        url: "/chat-history",
        icon: MessageCircleMore,
        isPremium: false,
        code: "chatHistoryAccess",
      },

      {
        name: "AI Check-In",
        url: "/ai-checkin",
        icon: HandHeart,
        isPremium: false,
        code: "aiCheckInAccess",
      },
    ],
  };
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [allRead, setAllRead] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error signing out:", error.message);
      return null;
    }
    router.push("/signin");
  };

  return (
    <>
      <AccountModal
        open={isAccountModalOpen}
        onOpenChange={setIsAccountModalOpen}
        userInfo={userInfo}
      />
      <NotificationModal
        open={isNotificationModalOpen}
        onOpenChange={setIsNotificationModalOpen}
        setAllRead={setAllRead}
      />
      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
      />
      <SupportModal
        isOpen={isSupportModalOpen}
        onClose={() => setIsSupportModalOpen(false)}
      />
      <Sidebar>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <a href="#">
                  <div className="grid flex-1 text-left ml-1">
                    <span className="truncate font-bold text-xl text-[#4342B9]">
                      euphonia
                    </span>
                    {/* <span className="truncate text-xs">your ai therapist</span> */}
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          {/* <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                  {item.items?.length ? (
                    <>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuAction className="data-[state=open]:rotate-90">
                          <ChevronRight />
                          <span className="sr-only">Toggle</span>
                        </SidebarMenuAction>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items?.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild>
                                <a href={subItem.url}>
                                  <span>{subItem.title}</span>
                                </a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </>
                  ) : null}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup> */}
          <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel>Menu</SidebarGroupLabel>
            <SidebarMenu>
              {data.projects
                .filter((module) =>
                  currentFeatures
                    .map((feature) => feature.code)
                    .includes(module.code)
                )
                .map((item) => (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url} className="font-medium">
                        <item.icon />
                        <span>{item.name}</span>
                        {item.isPremium && (
                          // <Image
                          //   src={"/premium.png"}
                          //   alt="Premium"
                          //   height={22}
                          //   width={22}
                          // />
                          <div className="flex-1 text-yellow-500 ml-2">
                            premium
                          </div>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              {/* <SidebarMenuItem>
                <SidebarMenuButton>
                  <MoreHorizontal />
                  <span>More</span>
                </SidebarMenuButton>
              </SidebarMenuItem> */}
            </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup className="mt-auto">
            <SidebarGroupContent>
              <SidebarMenu>
                {data.navSecondary.map((item) => (
                  <SidebarMenuItem key={item.title} onClick={item.onClick}>
                    <SidebarMenuButton asChild size="sm">
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage
                        src={avatar ?? userInfo?.avatar}
                        alt={userInfo?.name}
                      />
                      <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {userInfo?.name}
                      </span>
                      <span className="truncate text-xs">{email}</span>
                    </div>
                    <ChevronsUpDown className="ml-auto size-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                  side="bottom"
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage
                          src={avatar ?? userInfo?.avatar}
                          alt={userInfo?.name}
                        />
                        <AvatarFallback className="rounded-lg">
                          CN
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                          {userInfo?.name}
                        </span>
                        <span className="truncate text-xs">{email}</span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Sparkles />
                      Upgrade to Pro
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      onClick={() => setIsAccountModalOpen(true)}
                    >
                      <BadgeCheck />
                      Account
                    </DropdownMenuItem>
                    <Link href="/billing">
                      <DropdownMenuItem>
                        <CreditCard />
                        Billing
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem
                      onClick={() => setIsNotificationModalOpen(true)}
                    >
                      {allRead ? (
                        <Bell />
                      ) : (
                        <BellDot className="text-red-500" />
                      )}
                      Notifications{" "}
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={async () => {
                      handleSignOut();
                    }}
                  >
                    <LogOut />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <div className="border-t py-4 mt-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-[500] bg-[#4B4ACF] py-1 px-4 rounded-lg text-white text-sidebar-secondary-foreground">
                    {planName}
                  </p>
                  <p className="text-sm font-[500]">
                    {usedSessions}/{allotedSessions} Sessions
                  </p>
                </div>
                <Progress
                  value={(usedSessions / (allotedSessions ?? 1)) * 100}
                  className="h-3 mt-2"
                />
              </div>
              {planName !== "Harmonic" ? (
                <Button className="w-full bg-indigo-600 font-semibold text-base shadow-lg hover:bg-indigo-700">
                  Premium <Crown />
                </Button>
              ) : (
                <Link href="/checkout">
                  <Button className="w-full">Upgrade</Button>
                </Link>
              )}
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </>
  );
}
