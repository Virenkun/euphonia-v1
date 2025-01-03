import { getErrorRedirect, getStatusRedirect } from "@/helpers/helpers";
import { sendMail } from "@/lib/send-mail";
import { WelcomeTemplate } from "@/template/template";
import { createClient } from "@/utils/supabase/server";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the `@supabase/ssr` package. It exchanges an auth code for the user's session.
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    console.log("callback", data);

    const userInfo = await supabase
      .from("user_info")
      .select("*")
      .eq("email", data?.user?.email);
    const isFirstTimeUser = userInfo.data && userInfo.data.length === 0;
    if (isFirstTimeUser && data.user) {
      await supabase.from("user_info").insert([
        {
          is_onboarded: false,
          auth_id: data.user.id,
          email: data.user.email,
        },
      ]);
      await sendMail({
        email: process.env.SMTP_SERVER_USERNAME ?? "",
        sendTo: data.user.email,
        subject: "Welcome to the site!",
        text: "You have successfully signed up.",
        html: WelcomeTemplate({ userName: data.user.email }),
      });
    }

    if (error) {
      return NextResponse.redirect(
        getErrorRedirect(
          `${requestUrl.origin}/signin`,
          error.name,
          "Sorry, we weren't able to log you in. Please try again."
        )
      );
    }
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(
    getStatusRedirect(
      `${requestUrl.origin}/main`,
      "Success!",
      "You are now signed in."
    )
  );
}
