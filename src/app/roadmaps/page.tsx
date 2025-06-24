import RoadmapsWrapper from "@/components/RoadmapsWrapper";

import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Roadmaps - UpTrack",
  description:
    "Track your journey, mark progress, stay focused and keep moving forward",
};
const RoadmapsPage = () => {
  return (
    <div>
      <RoadmapsWrapper />
    </div>
  );
};

export default RoadmapsPage;
