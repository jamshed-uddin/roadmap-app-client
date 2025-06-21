"use client";

import React from "react";
import RoadmapLIst from "./RoadmapLIst";
import { useGetRoadmapQuery } from "@/redux/api/roadmapApi";
import { RoadmapListSkeleton } from "./Skeletons";

const Roadmaps = () => {
  const { data, isLoading, error } = useGetRoadmapQuery({});
  console.log(data);

  return (
    <div>
      <h2 className="text-center text-lg mb-4">Roadmaps</h2>
      {isLoading ? (
        <RoadmapListSkeleton />
      ) : error ? (
        <h3 className="text-center ">Failed to load roadmaps</h3>
      ) : (
        <RoadmapLIst roadmaps={data} />
      )}
    </div>
  );
};

export default Roadmaps;
