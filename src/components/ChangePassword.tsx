"use client";

import React, { useState } from "react";
import { useAppSelector } from "@/hooks/hook";
import { useForm } from "react-hook-form";
import Button from "./Button";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import { useChangePasswordMutation } from "@/redux/api/userApis";

type FormData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const ChangePassword = () => {
  const { userInfo } = useAppSelector((state) => state.user);
  const [changePassword, { isLoading: changePasswordLoading }] =
    useChangePasswordMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      if (data.newPassword !== data.confirmPassword) {
        return setError("New passwords do not match");
      }

      const res = await changePassword({
        userId: userInfo?._id as string,
        currentPassword: data.currentPassword,
        newPassword: data.confirmPassword,
      });

      if (res.error) {
        return toast.error("Failed to change password");
      }

      toast.success("Password changed");
      reset();
    } catch {
      toast.error("Failed to change password");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 mt-6">
      <div>
        <label className="flex justify-between items-center text-sm font-medium mb-1">
          <span>Current password</span>
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
          {...register("currentPassword", {
            required: "Current password is required",
            onChange: () => setError(""),
          })}
          className={`border rounded-md p-2 block w-full ${
            errors.currentPassword
              ? "border-red-500 focus:outline-red-500"
              : "border-black focus:outline-indigo-500"
          }`}
          placeholder="Current password"
        />
        {errors.currentPassword && (
          <span className="text-red-500 text-sm">
            {errors.currentPassword.message}
          </span>
        )}
      </div>
      <div>
        <label className="flex justify-between items-center text-sm font-medium mb-1">
          <span>New password</span>
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
          {...register("newPassword", {
            required: "New password is required",
            onChange: () => setError(""),
          })}
          className={`border rounded-md p-2 block w-full ${
            errors.newPassword
              ? "border-red-500 focus:outline-red-500"
              : "border-black focus:outline-indigo-500"
          }`}
          placeholder="New password"
        />
        {errors.newPassword && (
          <span className="text-red-500 text-sm">
            {errors.newPassword.message}
          </span>
        )}
      </div>
      <div>
        <label className="flex justify-between items-center text-sm font-medium mb-1">
          <span>Confirm password</span>
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
          {...register("confirmPassword", {
            required: "Confirm password is required",
            onChange: () => setError(""),
          })}
          className={`border rounded-md p-2 block w-full ${
            errors.confirmPassword
              ? "border-red-500 focus:outline-red-500"
              : "border-black focus:outline-indigo-500"
          }`}
          placeholder="Re-type new password"
        />
        {errors.confirmPassword && (
          <span className="text-red-500 text-sm">
            {errors.confirmPassword.message}
          </span>
        )}
      </div>
      <span className="text-sm text-red-500 ">{error}</span>
      <div className="flex justify-end">
        <Button
          loading={changePasswordLoading}
          disabled={changePasswordLoading}
          type="submit"
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default ChangePassword;
