import { ItemType } from "@/definition";
import clsx from "clsx";
import React from "react";

const RoadmapItems = ({ items }: { items: ItemType[] }) => {
  return (
    <div>
      {items.map((item, idx) => (
        <div
          key={item.id}
          className={clsx("", item.type === "topic" ? "" : "pl-4 ")}
        >
          <div
            className={clsx(
              " py-2",
              item.type === "topic"
                ? "border-b border-gray-400"
                : "border-b border-gray-300 "
            )}
          >
            {item.type === "topic" && `${idx + 1} .`} {item.title}
          </div>
          <RoadmapItems items={item?.items} />
        </div>
      ))}
    </div>
  );
};

export default RoadmapItems;
