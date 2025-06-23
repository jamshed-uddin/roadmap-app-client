import { CommentType } from "@/definition";
import { baseApi } from "./baseApi";

const commentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query<CommentType[], string>({
      query: (itemId) => ({
        url: `/comments?item=${itemId}`,
      }),
      providesTags: ["Comments"],
    }),
    createComment: builder.mutation<
      { message: string },
      { itemId: string; content: string; replyTo: string | null }
    >({
      query: (body) => ({
        url: "/comments",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Comments"],
    }),
    updateComment: builder.mutation<
      { message: string },
      { id: string; content: string; userId: string }
    >({
      query: ({ id, content, userId }) => ({
        url: `/comments/${id}`,
        method: "PUT",
        body: { content, userId },
      }),
      invalidatesTags: ["Comments"],
    }),
    deleteComment: builder.mutation<{ message: string }, string>({
      query: (commentId) => ({
        url: `/comments/${commentId}`,
      }),
      invalidatesTags: ["Comments"],
    }),
  }),
});

export const {
  useCreateCommentMutation,
  useGetCommentsQuery,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = commentApi;
