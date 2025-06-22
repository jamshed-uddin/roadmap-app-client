import React from "react";
import RoadmapDetails from "./RoadmapDetails";

const RoadmapDetailPage = async ({
  params,
}: {
  params: Promise<{ roadmapId: string }>;
}) => {
  const { roadmapId } = await params;

  return (
    <div>
      <RoadmapDetails roadmapId={roadmapId} />
    </div>
  );
};

export default RoadmapDetailPage;
