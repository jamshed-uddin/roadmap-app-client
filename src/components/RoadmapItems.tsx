import clsx from "clsx";
import React from "react";

const RoadmapItems = ({ items }) => {
  return (
    <div>
      {items.map((item) => (
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
            {item.title}
          </div>
          <RoadmapItems items={item?.items} />
        </div>
      ))}
    </div>
  );
};

export default RoadmapItems;
