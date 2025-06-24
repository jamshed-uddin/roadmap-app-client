import { UserInfo } from "@/definition";
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

    updateUser: builder.mutation<UserInfo, { _id: string; name: string }>({
      query: ({ _id, name }) => ({
        url: `/users/${_id}`,
        method: "PUT",
        body: { name },
      }),
    }),

    changePassword: builder.mutation<
      { message: string },
      { userId: string; currentPassword: string; newPassword: string }
    >({
      query: (body) => ({
        url: `/users/changepassword`,
        method: "PUT",
        body: body,
      }),
    }),

    deleteUser: builder.mutation<{ message: string }, string>({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useUpdateUserMutation,
  useChangePasswordMutation,
  useDeleteUserMutation,
} = userApis;
