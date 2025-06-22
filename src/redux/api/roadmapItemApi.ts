import { ItemType } from "@/definition";
import { baseApi } from "./baseApi";

const roadmapItemApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRoadmapItem: builder.query<ItemType, string>({
      query: (roadmapItemId) => ({
        url: `/roadmapitems/${roadmapItemId}`,
      }),
    }),
  }),
});

export const { useGetRoadmapItemQuery } = roadmapItemApi;
