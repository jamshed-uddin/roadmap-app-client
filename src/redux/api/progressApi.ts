import { ProgressType } from "@/definition";
import { baseApi } from "./baseApi";

const progressApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRoadmapProgress: builder.query<ProgressType[], { roadmapId: string }>({
      query: ({ roadmapId }) => ({
        url: `/progresses/roadmap-progress/${roadmapId}`,
      }),
      providesTags: ["Progress"],
    }),
    getItemProgress: builder.query<
      { progress: ProgressType },
      { itemId: string }
    >({
      query: ({ itemId }) => ({
        url: `/progresses/${itemId}`,
      }),
      providesTags: ["Progress"],
    }),
    saveProgress: builder.mutation<
      { message: string },
      {
        roadmapId: string;
        itemId: string;
        status: string | "pending" | "inProgress" | "complete";
      }
    >({
      query: (body) => ({
        url: "/progresses",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Progress"],
    }),

    updateProgress: builder.mutation<
      { message: string },
      { status: string; progressId: string }
    >({
      query: ({ progressId, status }) => ({
        url: `/progresses/${progressId}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["Progress"],
    }),
  }),
});

export const {
  useGetItemProgressQuery,
  useGetRoadmapProgressQuery,
  useSaveProgressMutation,
  useUpdateProgressMutation,
} = progressApi;
