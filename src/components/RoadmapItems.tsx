import { ItemType } from "@/definition";
import clsx from "clsx";
import React from "react";
import RoadmapItemTitleLink from "./RoadmapItemTitleLink";

const RoadmapItems = ({ items }: { items: ItemType[] }) => {
  return (
    <div>
      {items?.map((item) => (
        <div
          key={item._id}
          className={clsx("", item.type === "topic" ? "" : "pl-5 ")}
        >
          <RoadmapItemTitleLink item={item} />
          <RoadmapItems items={item?.items} />
        </div>
      ))}
    </div>
  );
};

export default RoadmapItems;
