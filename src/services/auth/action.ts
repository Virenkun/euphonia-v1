"use server";

import { getAuthTypes } from "@/helpers/auth-helpers";
import {
  getErrorRedirect,
  getStatusRedirect,
  getURL,
  isValidEmail,
  isValidPhoneNumber,
} from "@/helpers/helpers";
import { sendMail } from "@/lib/send-mail";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { WelcomeTemplate } from "@/template/template";

export async function login(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    if (error.message === "Invalid login credentials") {
      return { error: "The email or password you entered is incorrect." };
    }
    return { error: error.message };
  }

  redirect("/dashboard");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp({
    ...data,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  if (error) {
    if (error.message.includes("User already registered")) {
      return { error: "An account with this email already exists." };
    }
    return { error: error.message };
  }

  return {
    success: "Please check your email for a confirmation link.",
    email: data.email,
  };
}

export async function confirmSignup(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const token = formData.get("token") as string;

  console.log("email", email, token);

  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: "email",
  });

  if (error) {
    console.error("Error confirming email:", error.message);
    return { error: "Invalid or expired confirmation code." };
  } else {
    if (data.user) {
      await supabase.from("user_info").insert([
        {
          is_onboarded: false,
          auth_id: data.user.id,
          email: data.user.email,
        },
      ]);
      await sendMail({
        email: process.env.SMTP_SERVER_USERNAME || "",
        sendTo: data.user.email,
        subject: "Welcome to the site!",
        text: "You have successfully signed up.",
        html: WelcomeTemplate({ userName: data.user.email }),
      });
    }
  }

  redirect("/onboarding-form");
}

export async function resendConfirmationEmail(formData: FormData) {
  const supabase = await createClient();
  const email = formData.get("email") as string;

  const { error } = await supabase.auth.resend({
    type: "signup",
    email: email,
  });

  if (error) {
    return { error: error.message };
  }

  return { success: "Confirmation email resent. Please check your inbox." };
}

export async function signInWithGoogle() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "consent",
        redirectTo: "http://localhost:3000/main",
      },
    },
  });

  if (error) {
    return { error: error.message };
  }

  return { url: data.url };
}

export async function SignOut(formData: FormData) {
  const pathName = String(formData.get("pathName")).trim();

  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    return getErrorRedirect(
      pathName,
      "Hmm... Something went wrong.",
      "You could not be signed out."
    );
  }

  return "/signin";
}

export async function signInWithEmail(formData: FormData) {
  const cookieStore = await cookies();
  const callbackURL = getURL("/auth/callback");

  const email = String(formData.get("email")).trim();
  let redirectPath: string;

  if (!isValidEmail(email)) {
    redirectPath = getErrorRedirect(
      "/signin/email_signin",
      "Invalid email address.",
      "Please try again."
    );
  }

  const supabase = await createClient();
  const options = {
    emailRedirectTo: callbackURL,
    shouldCreateUser: true,
  };

  // If allowPassword is false, do not create a new user
  const { allowPassword } = getAuthTypes();
  if (allowPassword) options.shouldCreateUser = false;
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: options,
  });

  if (error) {
    redirectPath = getErrorRedirect(
      "/signin/email_signin",
      "You could not be signed in.",
      error.message
    );
  } else if (data) {
    cookieStore.set("preferredSignInView", "email_signin", { path: "/" });
    redirectPath = getStatusRedirect(
      `/confirm?email=${email}&`,
      "Success!",
      "Please check your email for a magic link. You may now close this tab.",
      true
    );
  } else {
    redirectPath = getErrorRedirect(
      "/signin/email_signin",
      "Hmm... Something went wrong.",
      "You could not be signed in."
    );
  }

  return redirectPath;
}

export async function signInWithPhone(formData: FormData) {
  const cookieStore = await cookies();
  const callbackURL = getURL("/auth/callback");

  const phoneNumber = String(formData.get("phone")).trim();
  console.log(phoneNumber, "phone");
  let redirectPath: string;

  if (!isValidPhoneNumber(phoneNumber)) {
    redirectPath = getErrorRedirect(
      "/signin/email_signin",
      "Invalid phone number.",
      "Please try again."
    );
  }

  const supabase = await createClient();
  const options = {
    emailRedirectTo: callbackURL,
    shouldCreateUser: true,
  };

  // // If allowPassword is false, do not create a new user
  // const { allowPassword } = getAuthTypes();
  // if (allowPassword) options.shouldCreateUser = false;
  const { data, error } = await supabase.auth.signInWithOtp({
    phone: phoneNumber,
    options: options,
  });

  if (error) {
    redirectPath = getErrorRedirect(
      "/signin/email_signin",
      `You could not be signed in. ${phoneNumber}`,
      error.message
    );
  } else if (data) {
    cookieStore.set("preferredSignInView", "email_signin", { path: "/" });
    redirectPath = getStatusRedirect(
      `/confirm?email=${phoneNumber}&`,
      "Success!",
      "Please check your email for a magic link. You may now close this tab.",
      true
    );
  } else {
    redirectPath = getErrorRedirect(
      "/signin/email_signin",
      "Hmm... Something went wrong.",
      "You could not be signed in."
    );
  }

  return redirectPath;
}

export async function requestPasswordUpdate(formData: FormData) {
  const callbackURL = getURL("/auth/reset_password");

  // Get form data
  const email = String(formData.get("email")).trim();
  let redirectPath: string;

  if (!isValidEmail(email)) {
    redirectPath = getErrorRedirect(
      "/signin/forgot_password",
      "Invalid email address.",
      "Please try again."
    );
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: callbackURL,
  });

  if (error) {
    redirectPath = getErrorRedirect(
      "/signin/forgot_password",
      error.message,
      "Please try again."
    );
  } else if (data) {
    redirectPath = getStatusRedirect(
      "/signin/forgot_password",
      "Success!",
      "Please check your email for a password reset link. You may now close this tab.",
      true
    );
  } else {
    redirectPath = getErrorRedirect(
      "/signin/forgot_password",
      "Hmm... Something went wrong.",
      "Password reset email could not be sent."
    );
  }

  return redirectPath;
}

export async function signInWithPassword(formData: FormData) {
  const cookieStore = await cookies();
  const email = String(formData.get("email")).trim();
  const password = String(formData.get("password")).trim();
  let redirectPath: string;

  const supabase = await createClient();
  const { error, data } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirectPath = getErrorRedirect(
      "/signin/password_signin",
      "Sign in failed.",
      error.message
    );
  } else if (data.user) {
    cookieStore.set("preferredSignInView", "password_signin", { path: "/" });
    redirectPath = getStatusRedirect("/", "Success!", "You are now signed in.");
  } else {
    redirectPath = getErrorRedirect(
      "/signin/password_signin",
      "Hmm... Something went wrong.",
      "You could not be signed in."
    );
  }

  return redirectPath;
}

export async function signUp(formData: FormData) {
  const callbackURL = getURL("/auth/callback");

  const email = String(formData.get("email")).trim();
  const password = String(formData.get("password")).trim();
  let redirectPath: string;

  if (!isValidEmail(email)) {
    redirectPath = getErrorRedirect(
      "/signin/signup",
      "Invalid email address.",
      "Please try again."
    );
  }

  const supabase = await createClient();
  const { error, data } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: callbackURL,
    },
  });

  if (error) {
    redirectPath = getErrorRedirect(
      "/signin/signup",
      "Sign up failed.",
      error.message
    );
  } else if (data.session) {
    redirectPath = getStatusRedirect("/", "Success!", "You are now signed in.");
  } else if (
    data?.user &&
    data?.user?.identities &&
    data?.user?.identities.length == 0
  ) {
    redirectPath = getErrorRedirect(
      "/signin/signup",
      "Sign up failed.",
      "There is already an account associated with this email address. Try resetting your password."
    );
  } else if (data.user) {
    redirectPath = getStatusRedirect(
      `/confirm?email=${email}&`,
      "Success!",
      "Please check your email for a confirmation link. You may now close this tab."
    );
  } else {
    redirectPath = getErrorRedirect(
      "/signin/signup",
      "Hmm... Something went wrong.",
      "You could not be signed up."
    );
  }

  return redirectPath;
}

export async function updatePassword(formData: FormData) {
  const password = String(formData.get("password")).trim();
  const passwordConfirm = String(formData.get("passwordConfirm")).trim();
  let redirectPath: string;

  // Check that the password and confirmation match
  if (password !== passwordConfirm) {
    redirectPath = getErrorRedirect(
      "/signin/update_password",
      "Your password could not be updated.",
      "Passwords do not match."
    );
  }

  const supabase = await createClient();
  const { error, data } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    redirectPath = getErrorRedirect(
      "/signin/update_password",
      "Your password could not be updated.",
      error.message
    );
  } else if (data.user) {
    redirectPath = getStatusRedirect(
      "/",
      "Success!",
      "Your password has been updated."
    );
  } else {
    redirectPath = getErrorRedirect(
      "/signin/update_password",
      "Hmm... Something went wrong.",
      "Your password could not be updated."
    );
  }

  return redirectPath;
}

export async function updateEmail(formData: FormData) {
  // Get form data
  const newEmail = String(formData.get("newEmail")).trim();

  // Check that the email is valid
  if (!isValidEmail(newEmail)) {
    return getErrorRedirect(
      "/account",
      "Your email could not be updated.",
      "Invalid email address."
    );
  }

  const supabase = await createClient();

  const callbackUrl = getURL(
    getStatusRedirect("/account", "Success!", `Your email has been updated.`)
  );

  const { error } = await supabase.auth.updateUser(
    { email: newEmail },
    {
      emailRedirectTo: callbackUrl,
    }
  );

  if (error) {
    return getErrorRedirect(
      "/account",
      "Your email could not be updated.",
      error.message
    );
  } else {
    return getStatusRedirect(
      "/account",
      "Confirmation emails sent.",
      `You will need to confirm the update by clicking the links sent to both the old and new email addresses.`
    );
  }
}

export async function updateName(formData: FormData) {
  // Get form data
  const fullName = String(formData.get("fullName")).trim();

  const supabase = await createClient();
  const { error, data } = await supabase.auth.updateUser({
    data: { full_name: fullName },
  });

  if (error) {
    return getErrorRedirect(
      "/account",
      "Your name could not be updated.",
      error.message
    );
  } else if (data.user) {
    return getStatusRedirect(
      "/account",
      "Success!",
      "Your name has been updated."
    );
  } else {
    return getErrorRedirect(
      "/account",
      "Hmm... Something went wrong.",
      "Your name could not be updated."
    );
  }
}

export async function signOut() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Error signing out:", error.message);
    return null;
  }
  return redirect("/signin");
}
