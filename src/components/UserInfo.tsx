"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import React from "react";
import { useForm } from "react-hook-form";
import Button from "./Button";
import { useUpdateUserMutation } from "@/redux/api/userApis";
import { setUser } from "@/redux/features/userSlice";
import toast from "react-hot-toast";
import { UserInfo as UserType } from "@/definition";

type FormData = {
  name: string;
  email: string;
};

const UserInfo = () => {
  const { userInfo } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [updateUser, { isLoading: updateUserLoading }] =
    useUpdateUserMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      console.log(data);
      const res = await updateUser({
        _id: userInfo?._id as string,
        name: data.name,
      });
      console.log();

      if (res.error) {
        return toast.error("Failed to update user info");
      }
      dispatch(setUser(res?.data as UserType));
      toast.success("User name updated");
    } catch {
      toast.error("Failed to update user info");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 mt-6">
      <div>
        <label className="text-sm font-medium mb-1 block">Name</label>
        <input
          type="text"
          {...register("name", { required: "Email is required" })}
          className={`border rounded-md p-2 block w-full ${
            errors.name
              ? "border-red-500 focus:outline-red-500"
              : "border-black focus:outline-indigo-500"
          }`}
          defaultValue={userInfo?.name}
        />
        {errors.name && (
          <span className="text-red-500 text-sm">{errors.name.message}</span>
        )}
      </div>
      <div>
        <label className="text-sm font-medium mb-1 block">Email</label>
        <input
          type="text"
          {...register("email", { required: "Email is required" })}
          className={`border rounded-md p-2 block disabled:opacity-50 w-full ${
            errors.email
              ? "border-red-500 focus:outline-red-500"
              : "border-black focus:outline-indigo-500"
          }`}
          defaultValue={userInfo?.email}
          disabled
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}
      </div>
      <div className="flex justify-end">
        <Button
          disabled={updateUserLoading}
          loading={updateUserLoading}
          type="submit"
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default UserInfo;
