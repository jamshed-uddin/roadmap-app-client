import { RoadmapType } from "@/definition";
import { baseApi } from "./baseApi";

const roadmapApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRoadmap: builder.query<
      RoadmapType[],
      { status?: string; popular?: boolean }
    >({
      query: (queryParams) => {
        const { status, popular } = queryParams;
        let url = "/roadmaps";

        if (status) {
          url += `?status=${status}`;
        }

        if (popular) {
          url += status ? `&popular=${popular}` : `?popular=${popular}`;
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
