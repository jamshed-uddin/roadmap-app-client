import React from "react";

const RoadmapDetailPage = async ({
  params,
}: {
  params: Promise<{ roadmapId: string }>;
}) => {
  const { roadmapId } = await params;
  return (
    <div>
      <h4>{roadmapId}</h4>
    </div>
  );
};

export default RoadmapDetailPage;
