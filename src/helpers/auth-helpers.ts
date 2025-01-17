import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { redirectToPath } from "./helpers";

export async function handleRequest(
  e: React.FormEvent<HTMLFormElement> | FormData,
  requestFunc: (formData: FormData) => Promise<string>,
  router: AppRouterInstance | null = null
): Promise<boolean | void> {
  let formData;
  if (e instanceof FormData) {
    formData = e;
  } else {
    formData = new FormData(e.currentTarget);
  }
  const redirectUrl: string = await requestFunc(formData);

  if (router) {
    // If client-side router is provided, use it to redirect
    return router.push(redirectUrl);
  } else {
    // Otherwise, redirect server-side
    return await redirectToPath(redirectUrl);
  }
}

// Boolean toggles to determine which auth types are allowed
const allowOauth = true;
const allowEmail = true;
const allowPassword = true;

// Boolean toggle to determine whether auth interface should route through server or client
// (Currently set to false because screen sometimes flickers with server redirects)
const allowServerRedirect = false;

// Check that at least one of allowPassword and allowEmail is true
if (!allowPassword && !allowEmail)
  throw new Error("At least one of allowPassword and allowEmail must be true");

export const getAuthTypes = () => {
  return { allowOauth, allowEmail, allowPassword };
};

export const getViewTypes = () => {
  // Define the valid view types
  let viewTypes: string[] = [];
  if (allowEmail) {
    viewTypes = [...viewTypes, "email_signin"];
  }
  if (allowPassword) {
    viewTypes = [
      ...viewTypes,
      "password_signin",
      "forgot_password",
      "update_password",
      "signup",
    ];
  }

  return viewTypes;
};

export const getDefaultSignInView = (preferredSignInView: string | null) => {
  // Define the default sign in view
  let defaultView = allowPassword ? "password_signin" : "email_signin";
  if (preferredSignInView && getViewTypes().includes(preferredSignInView)) {
    defaultView = preferredSignInView;
  }

  return defaultView;
};

export const getRedirectMethod = () => {
  return allowServerRedirect ? "server" : "client";
};
