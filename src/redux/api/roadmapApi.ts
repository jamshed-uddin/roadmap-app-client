import { RoadmapType } from "@/definition";
import { baseApi } from "./baseApi";

const roadmapApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRoadmap: builder.query<RoadmapType[], string>({
      query: (queryParams) => {
        let url = `/roadmaps`;

        if (queryParams) {
          url += `?${queryParams}`;
        }

        return url;
      },
    }),
    getSingleRoadmap: builder.query<RoadmapType, string>({
      query: (roadmapId) => ({
        url: `/roadmaps/${roadmapId}`,
      }),
    }),
  }),
});

export const { useGetRoadmapQuery, useGetSingleRoadmapQuery } = roadmapApi;
