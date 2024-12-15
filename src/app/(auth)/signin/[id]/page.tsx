import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import PasswordSignIn from "@/components/AuthForms/PasswordSignIn";
import EmailSignIn from "@/components/AuthForms/EmailSignIn";
import ForgotPassword from "@/components/AuthForms/ForgotPassword";
import UpdatePassword from "@/components/AuthForms/UpdatePassword";
import SignUp from "@/components/AuthForms/Signup";
import {
  getAuthTypes,
  getDefaultSignInView,
  getRedirectMethod,
  getViewTypes,
} from "@/helpers/auth-helpers";
import { Card } from "@/components/ui/card";

export default async function SignIn({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: {
    disable_button: boolean;
    error: string;
    error_description: string;
  };
}) {
  const { allowEmail, allowPassword } = getAuthTypes();
  const viewTypes = getViewTypes();
  const redirectMethod = getRedirectMethod();

  // Declare 'viewProp' and initialize with the default value
  let viewProp: string;

  // Assign url id to 'viewProp' if it's a valid string and ViewTypes includes it
  if (
    typeof (await params).id === "string" &&
    viewTypes.includes((await params).id)
  ) {
    viewProp = (await params).id;
  } else {
    const preferredSignInView =
      (await cookies()).get("preferredSignInView")?.value || null;
    viewProp = getDefaultSignInView(preferredSignInView);
    return redirect(`/signin/${viewProp}`);
  }

  // Check if the user is already logged in and redirect to the account page if so
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user && viewProp !== "update_password") {
    return redirect("/");
  } else if (!user && viewProp === "update_password") {
    return redirect("/signin");
  }

  return (
    <div className="flex justify-center items-center  min-h-screen">
      <div className="flex flex-col justify-between items-center max-w-lg p-3 m-auto w-80 ">
        <div className="flex justify-center pb-12 "></div>
        <Card
          title={
            viewProp === "forgot_password"
              ? "Reset Password"
              : viewProp === "update_password"
              ? "Update Password"
              : viewProp === "signup"
              ? "Sign Up"
              : "Sign In"
          }
        >
          {viewProp === "password_signin" && (
            <PasswordSignIn
              allowEmail={allowEmail}
              redirectMethod={redirectMethod}
            />
          )}
          {viewProp === "email_signin" && (
            <EmailSignIn
              allowPassword={allowPassword}
              redirectMethod={redirectMethod}
              disableButton={searchParams.disable_button}
            />
          )}
          {viewProp === "forgot_password" && (
            <ForgotPassword
              allowEmail={allowEmail}
              redirectMethod={redirectMethod}
              disableButton={searchParams.disable_button}
            />
          )}
          {viewProp === "update_password" && (
            <UpdatePassword redirectMethod={redirectMethod} />
          )}
          {viewProp === "signup" && (
            <SignUp allowEmail={allowEmail} redirectMethod={redirectMethod} />
          )}
        </Card>
      </div>
    </div>
  );
}
