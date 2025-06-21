import { baseApi } from "./baseApi";

const roadmapApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRoadmap: builder.query({
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
  }),
});

export const { useGetRoadmapQuery } = roadmapApi;
