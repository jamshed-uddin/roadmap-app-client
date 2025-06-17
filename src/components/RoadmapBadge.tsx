import Link from "next/link";
import React from "react";

interface RoadmapBadgeProps {
  id: string;
  title: string;
}

const RoadmapBadge = ({ roadmap }: { roadmap: RoadmapBadgeProps }) => {
  return (
    <Link
      href={`/roadmaps/${roadmap.id}`}
      key={roadmap.id}
      className="border border-slate-800 rounded-xl px-3 py-1.5"
    >
      <h3>{roadmap.title}</h3>
    </Link>
  );
};

export default RoadmapBadge;
