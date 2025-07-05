import React, { Suspense } from "react";
import LoginForm from "./LoginForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - UpTrack",
  description:
    "Track your journey, mark progress, stay focused and keep moving forward",
};

const Login = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (token) {
    redirect("/");
  }
  return (
    <div className="h-screen ">
      <div className="h-full flex items-center justify-center">
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
};

export default Login;
