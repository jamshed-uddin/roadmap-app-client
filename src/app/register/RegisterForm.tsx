"use client";

import { useForm } from "react-hook-form";
import Button from "@/components/Button";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { useRegisterUserMutation } from "@/redux/api/userApis";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useAppDispatch } from "@/hooks/hook";
import { setUser } from "@/redux/features/userSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCookie } from "@/lib/cookies";

type FormData = {
  name: string;
  email: string;
  password: string;
};

const RegisterForm = () => {
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setError("");
    try {
      const res = await registerUser(data).unwrap();
      localStorage.setItem("userInfo", JSON.stringify(res.data));
      dispatch(setUser(res.data));
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
      <h3 className="uppercase text-lg mb-4 font-semibold">Register</h3>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="text-sm font-medium mb-1 block">Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className={`border rounded-xl p-2 block w-full ${
              errors.name
                ? "border-red-500 focus:outline-red-500"
                : "border-black focus:outline-indigo-500"
            }`}
          />
          {errors.name && (
            <span className="text-red-500 text-xs">{errors.name.message}</span>
          )}
        </div>
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
            <span className="text-red-500 text-xs">{errors.email.message}</span>
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
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className={`border rounded-xl p-2 block w-full ${
              errors.password
                ? "border-red-500 focus:outline-red-500"
                : "border-black focus:outline-indigo-500"
            }`}
          />
          {errors.password && (
            <span className="text-red-500 text-xs">
              {errors.password.message}
            </span>
          )}
        </div>
        {error && (
          <span className="block mb-2 text-red-500 text-sm">{error}</span>
        )}
        <div className="flex justify-center">
          <Button type="submit" loading={isLoading} disabled={isLoading}>
            Register
          </Button>
        </div>
      </form>

      <div className="mt-4 text-sm">
        <h3>
          Already have an account?{" "}
          <Link href={"/login"} className="underline text-blue-500">
            Login here
          </Link>
        </h3>
      </div>
    </div>
  );
};

export default RegisterForm;
