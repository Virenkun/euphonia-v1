import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getDefaultSignInView } from "@/helpers/auth-helpers";

export default async function SignIn() {
  const cookieStore = await cookies();
  const preferredSignInView =
    cookieStore.get("preferredSignInView")?.value || null;
  const defaultView = getDefaultSignInView(preferredSignInView);

  return redirect(`/signin/${defaultView}`);
}
