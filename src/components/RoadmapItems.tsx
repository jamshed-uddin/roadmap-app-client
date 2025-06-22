import { ItemType } from "@/definition";
import clsx from "clsx";
import Link from "next/link";
import React from "react";

const RoadmapItems = ({ items }: { items: ItemType[] }) => {
  return (
    <div>
      {items?.map((item) => (
        <div
          key={item._id}
          className={clsx("", item.type === "topic" ? "" : "pl-5 ")}
        >
          <Link
            href={`/roadmaps/${item.roadmapId}/${item._id}`}
            className={clsx(
              " py-2 block ",
              item.type === "topic"
                ? "border-b border-gray-300"
                : " text-sm my-2"
            )}
          >
            {item.title}
          </Link>
          <RoadmapItems items={item?.items} />
        </div>
      ))}
    </div>
  );
};

export default RoadmapItems;
