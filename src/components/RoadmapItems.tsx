import { ItemType } from "@/definition";
import clsx from "clsx";
import React from "react";

const RoadmapItems = ({ items }: { items: ItemType[] }) => {
  return (
    <div>
      {items?.map((item) => (
        <div
          key={item._id}
          className={clsx("", item.type === "topic" ? "" : "pl-5 ")}
        >
          <div
            className={clsx(
              " py-2",
              item.type === "topic"
                ? "border-b border-gray-300"
                : " text-sm my-2"
            )}
          >
            {item.title}
          </div>
          <RoadmapItems items={item?.items} />
        </div>
      ))}
    </div>
  );
};

export default RoadmapItems;
