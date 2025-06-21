import { UserInfo } from "@/lib/types";
import { baseApi } from "./baseApi";

const userApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation<
      { message: string; data: UserInfo },
      { email: string; password: string }
    >({
      query: (data) => ({
        url: "/users/login",
        method: "POST",
        body: data,
      }),
    }),

    registerUser: builder.mutation<
      { message: string; data: UserInfo },
      { name: string; email: string; password: string }
    >({
      query: (data) => ({
        url: "/users/register",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation } = userApis;
