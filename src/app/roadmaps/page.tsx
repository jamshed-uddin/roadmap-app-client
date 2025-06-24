import Roadmaps from "@/components/Roadmaps";
import { RoadmapListSkeleton } from "@/components/Skeletons";
import { Metadata } from "next";
import React, { Suspense } from "react";
export const metadata: Metadata = {
  title: "Roadmaps - UpTrack",
  description:
    "Track your journey, mark progress, stay focused and keep moving forward",
};
const RoadmapsPage = () => {
  return (
    <div>
      <Suspense>
        <Roadmaps />
      </Suspense>
    </div>
  );
};

export default RoadmapsPage;
