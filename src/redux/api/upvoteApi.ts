import { UpvoteType } from "@/definition";
import { baseApi } from "./baseApi";

const upvoteApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUpvotes: builder.query<UpvoteType, string>({
      query: (itemId) => ({
        url: `/upvotes?itemId=${itemId}`,
      }),
    }),
    saveUpvote: builder.mutation<{ message: string }, { itemId: string }>({
      query: (body) => ({
        url: "/upvotes",
        method: "POST",
        body,
      }),
    }),

    deleteUpvote: builder.mutation<{ message: string }, string>({
      query: (itemId) => ({
        url: `/upvotes/${itemId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useSaveUpvoteMutation,
  useGetUpvotesQuery,
  useDeleteUpvoteMutation,
} = upvoteApi;
