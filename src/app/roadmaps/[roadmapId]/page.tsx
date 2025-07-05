import React from "react";
import RoadmapDetails from "./RoadmapDetails";
import { RoadmapType } from "@/definition";

const getRoadmap = async (id: string): Promise<RoadmapType> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/roadmaps/${id}`
  );

  return await res.json();
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ roadmapId: string }>;
}) {
  const { roadmapId } = await params;

  const roadmap = await getRoadmap(roadmapId);

  return {
    title: `${roadmap?.title} Roadmap - UpTrack`,
    description: roadmap?.description,
  };
}

const RoadmapDetailPage = async ({
  params,
}: {
  params: Promise<{ roadmapId: string }>;
}) => {
  const { roadmapId } = await params;

  const roadmap = await getRoadmap(roadmapId);

  return (
    <div>
      <RoadmapDetails roadmap={roadmap} />
    </div>
  );
};

export default RoadmapDetailPage;
