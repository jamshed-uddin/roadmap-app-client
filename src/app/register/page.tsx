import React from "react";
import RegisterForm from "./RegisterForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register - UpTrack",
  description:
    "Track your journey, mark progress, stay focused and keep moving forward",
};

const Register = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (token) {
    redirect("/");
  }

  return (
    <div className="h-screen ">
      <div className="h-full flex items-center justify-center">
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
