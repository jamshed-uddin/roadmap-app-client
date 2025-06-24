"use client";

import { ItemDetailsSkeleton } from "@/components/Skeletons";
import UpvoteAndComment from "@/components/UpvoteAndComment";
import { useGetRoadmapItemQuery } from "@/redux/api/roadmapItemApi";
import { useParams } from "next/navigation";
import React from "react";

const RoadmapItemDetails = () => {
  const { roadmapItemId } = useParams();

  const {
    data: item,
    error,
    isLoading,
  } = useGetRoadmapItemQuery(roadmapItemId as string);

  if (isLoading) {
    return <ItemDetailsSkeleton />;
  }

  if (error) {
    return <h2>Something went wrong!</h2>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h4 className="text-3xl font-medium mb-3">{item?.title}</h4>
        <p className="text-lg">{item?.description}</p>
      </div>
      <UpvoteAndComment itemId={roadmapItemId as string} />
    </div>
  );
};

export default RoadmapItemDetails;
