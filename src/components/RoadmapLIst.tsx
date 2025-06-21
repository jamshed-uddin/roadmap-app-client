import React from "react";
import RoadmapBadge from "./RoadmapBadge";
import { RoadmapType } from "@/definition";

const RoadmapLIst = ({ roadmaps }: { roadmaps: RoadmapType[] }) => {
  return (
    <div className="flex gap-4 justify-center flex-wrap">
      {roadmaps?.map((roadmap) => (
        <RoadmapBadge roadmap={roadmap} key={roadmap._id} />
      ))}
    </div>
  );
};

export default RoadmapLIst;
