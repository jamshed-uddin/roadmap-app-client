"use client";

import RoadmapItems from "@/components/RoadmapItems";
import { RoadmapDetailsSkeleton } from "@/components/Skeletons";

import { useGetSingleRoadmapQuery } from "@/redux/api/roadmapApi";
import { useParams } from "next/navigation";
import React from "react";

const RoadmapDetails = () => {
  const { roadmapId } = useParams();

  console.log(typeof roadmapId);

  const {
    data: roadmap,
    isLoading,
    error,
  } = useGetSingleRoadmapQuery(roadmapId as string);

  if (isLoading) {
    return <RoadmapDetailsSkeleton />;
  }

  if (error) {
    return <h2 className="text-center">Something went wrong!</h2>;
  }

  return (
    <div>
      <div className="mb-3">
        <h4 className="text-3xl font-medium mb-3">{roadmap?.title}</h4>
        <p className="text-lg">{roadmap?.description}</p>
      </div>

      <div className="mt-10">
        <RoadmapItems items={roadmap?.items ?? []} />
      </div>
    </div>
  );
};

export default RoadmapDetails;
