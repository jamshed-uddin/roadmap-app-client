"use client";

import { useForm } from "react-hook-form";
import Button from "@/components/Button";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { useLoginUserMutation } from "@/redux/api/userApis";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useAppDispatch } from "@/hooks/hook";
import { setUser } from "@/redux/features/userSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCookie } from "@/lib/cookies";

type FormData = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const [login, { isLoading }] = useLoginUserMutation();
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: FormData) => {
    setError("");

    try {
      const res = await login(data).unwrap();
      localStorage.setItem("userInfo", JSON.stringify(res?.data));
      dispatch(setUser(res?.data));
      setCookie("token", res?.data.token);
      reset();
      router.replace("/dashboard");
    } catch (error) {
      const fetchError = error as FetchBaseQueryError;
      setError(
        (fetchError?.data as { message: string })?.message ||
          "Something went wrong"
      );
    }
  };

  return (
    <div className="lg:w-1/4 w-[90%]">
      <h3 className="uppercase text-lg mb-4 font-semibold">Login</h3>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="text-sm font-medium mb-1 block">Email</label>
          <input
            type="text"
            {...register("email", { required: "Email is required" })}
            className={`border rounded-xl p-2 block w-full ${
              errors.email
                ? "border-red-500 focus:outline-red-500"
                : "border-black focus:outline-indigo-500"
            }`}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>

        <div>
          <label className="flex justify-between items-center text-sm font-medium mb-1">
            <span>Password</span>
            <span
              onClick={() => setShowPassword((p) => !p)}
              className="cursor-pointer opacity-70"
            >
              {showPassword ? (
                <EyeIcon className="w-4 h-4" />
              ) : (
                <EyeSlashIcon className="w-4 h-4" />
              )}
            </span>
          </label>
          <input
            type={showPassword ? "text" : "password"}
            {...register("password", { required: "Password is required" })}
            className={`border rounded-xl p-2 block w-full ${
              errors.password
                ? "border-red-500 focus:outline-red-500"
                : "border-black focus:outline-indigo-500"
            }`}
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
        </div>
        {error && (
          <span className="block mb-2 text-red-500 text-sm">{error}</span>
        )}
        <div className="flex justify-center">
          <Button type="submit" loading={isLoading} disabled={isLoading}>
            Login
          </Button>
        </div>
      </form>

      <div className="mt-4 text-sm">
        <h3>
          Don&apos;t have an account?{" "}
          <Link href={"/register"} className="underline text-blue-500">
            Register here
          </Link>
        </h3>
      </div>
    </div>
  );
};

export default LoginForm;
