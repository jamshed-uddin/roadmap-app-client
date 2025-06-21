import { RoadmapType } from "@/definition";
import Link from "next/link";
import React from "react";

const RoadmapBadge = ({
  roadmap,
}: {
  roadmap: Pick<RoadmapType, "_id" | "title">;
}) => {
  return (
    <Link
      href={`/roadmaps/${roadmap._id}`}
      key={roadmap._id}
      className="border border-slate-800 rounded-xl px-3 py-1.5"
    >
      <h3>{roadmap.title}</h3>
    </Link>
  );
};

export default RoadmapBadge;
