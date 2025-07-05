import React from "react";
import RoadmapItemDetails from "./roadmapItemDetails";
import { ItemType } from "@/definition";

const getRoadmapItem = async (id: string): Promise<ItemType> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/roadmapitems/${id}`
  );

  return await res.json();
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ roadmapItemId: string }>;
}) {
  const { roadmapItemId } = await params;

  const roadmapItem = await getRoadmapItem(roadmapItemId);

  return {
    title: `${roadmapItem?.title} - ${roadmapItem.roadmapId.title} Roadmap - UpTrack`,
    description: roadmapItem?.description,
  };
}

const RoadmapItemPage = async ({
  params,
}: {
  params: Promise<{ roadmapItemId: string }>;
}) => {
  const { roadmapItemId } = await params;
  const roadmapItem = await getRoadmapItem(roadmapItemId);
  return (
    <div>
      <RoadmapItemDetails item={roadmapItem} />
    </div>
  );
};

export default RoadmapItemPage;
