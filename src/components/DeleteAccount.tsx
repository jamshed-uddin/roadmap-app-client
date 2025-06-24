"use client";

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "./Button";
import toast from "react-hot-toast";
import { useDeleteUserMutation } from "@/redux/api/userApis";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { removeUser } from "@/redux/features/userSlice";
type FormData = {
  password: string;
};
const DeleteAccount = () => {
  const { userInfo } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [deleteUser, { isLoading: deleteUserLoading }] =
    useDeleteUserMutation();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      console.log(data);
      const res = await deleteUser(userInfo?._id as string);
      if (res.error) {
        return toast.error("Failed to delete account");
      }

      reset();
      dispatch(removeUser());
    } catch {
      toast.error("Failed to delete account");
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 mt-6">
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
            required: "Current password is required",
          })}
          className={`border rounded-md p-2 block w-full ${
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

      <div className="flex justify-end">
        <Button
          loading={deleteUserLoading}
          disabled={deleteUserLoading}
          type="submit"
        >
          Delete
        </Button>
      </div>
    </form>
  );
};

export default DeleteAccount;
