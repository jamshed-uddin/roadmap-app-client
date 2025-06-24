"use client";

import React from "react";
import RoadmapLIst from "./RoadmapLIst";
import { useGetRoadmapQuery } from "@/redux/api/roadmapApi";
import { RoadmapListSkeleton } from "./Skeletons";

const HomeRoadmaps = () => {
  const { data, isLoading, error } = useGetRoadmapQuery("popular=true");

  return (
    <div>
      <h2 className="text-center text-lg mb-4">Roadmaps</h2>
      <div>
        {isLoading ? (
          <RoadmapListSkeleton />
        ) : error ? (
          <h3 className="text-center ">Failed to load roadmaps</h3>
        ) : (
          <RoadmapLIst roadmaps={data ?? []} />
        )}
      </div>
    </div>
  );
};

export default HomeRoadmaps;
