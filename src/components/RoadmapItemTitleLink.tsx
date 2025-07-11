"use client";
import { ItemType } from "@/definition";
import { useAppSelector } from "@/hooks/hook";
import { useGetItemProgressQuery } from "@/redux/api/progressApi";

import clsx from "clsx";
import Link from "next/link";
import React from "react";

const RoadmapItemTitleLink = ({ item }: { item: ItemType }) => {
  const { userInfo } = useAppSelector((state) => state.user);

  const {
    data: progress,
    isLoading: roadmapItemProgressLoading,
    error: roadmapItemProgressError,
  } = useGetItemProgressQuery(
    { itemId: item?._id as string },
    { skip: !userInfo }
  );
  return (
    <Link
      href={`/roadmaps/${item.roadmapId}/${item._id}`}
      className={clsx(
        " py-2 flex ",
        item.type === "topic" ? "border-b border-gray-300" : " text-sm my-2",
        !roadmapItemProgressLoading &&
          !roadmapItemProgressError &&
          progress?.progress.itemId === item?._id &&
          progress?.progress.status === "complete" &&
          "line-through decoration-indigo-600"
      )}
    >
      {item.title}
    </Link>
  );
};

export default RoadmapItemTitleLink;
