"use client";

import RoadmapItems from "@/components/RoadmapItems";
import { RoadmapDetailsSkeleton } from "@/components/Skeletons";
import { useAppSelector } from "@/hooks/hook";
import { useGetRoadmapProgressQuery } from "@/redux/api/progressApi";

import { useGetSingleRoadmapQuery } from "@/redux/api/roadmapApi";
import { useParams } from "next/navigation";
import React from "react";

const RoadmapDetails = () => {
  const { roadmapId } = useParams();
  const { userInfo } = useAppSelector((s) => s.user);

  const {
    data: roadmap,
    isLoading,
    error,
  } = useGetSingleRoadmapQuery(roadmapId as string);

  const {
    data: roadmapProgress,
    isLoading: roadmapProgressLoading,
    error: roadmapProgressError,
  } = useGetRoadmapProgressQuery(
    { roadmapId: roadmapId as string },
    { skip: !userInfo }
  );

  const calculateProgressPercentage = () => {
    const total = roadmap?.totalItems;
    const part = roadmapProgress?.filter(
      (item) => item.status === "complete"
    ).length;

    return Math.ceil((Number(part) / Number(total)) * 100);
  };

  if (isLoading) {
    return <RoadmapDetailsSkeleton />;
  }

  if (error) {
    return <h2 className="text-center">Something went wrong!</h2>;
  }

  return (
    <div>
      <div className="mb-3">
        {!roadmapProgressLoading &&
          !isLoading &&
          !roadmapProgressError &&
          userInfo && (
            <div className="mb-2">
              <div className="text-sm">{calculateProgressPercentage()}%</div>
              <div className="w-[100px] outline-1  h-2 relative">
                <div
                  style={{ width: `${calculateProgressPercentage()}px` }}
                  className={`absolute inset-0 h-2  bg-indigo-600 outline-1 outline-indigo-600`}
                ></div>
              </div>
            </div>
          )}
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
