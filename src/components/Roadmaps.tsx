"use client";

import React, { useEffect, useState } from "react";
import RoadmapLIst from "./RoadmapLIst";
import { useGetRoadmapQuery } from "@/redux/api/roadmapApi";
import { RoadmapListSkeleton } from "./Skeletons";
import { useRouter, useSearchParams } from "next/navigation";
import clsx from "clsx";
import { useAppSelector } from "@/hooks/hook";

const Roadmaps = () => {
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { userInfo } = useAppSelector((state) => state.user);

  const { data, isLoading, error } = useGetRoadmapQuery(
    searchParams.toString()
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  const setParams = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (name === "all") {
      params.delete("popular");
      params.delete("status");
    } else {
      params.set(name, value);
    }
    router.replace(`/roadmaps?${params.toString()}`);
  };

  return (
    <div>
      {/* filters */}
      <div className="flex gap-2 justify-end text-sm">
        <ul className="border rounded-md flex   divide-x w-fit">
          <li
            className="px-2 cursor-pointer rounded-l-md"
            onClick={() => setParams("all", "")}
          >
            All
          </li>
          <li
            onClick={() => setParams("popular", "true")}
            className={clsx(
              "px-2 cursor-pointer rounded-r-md",
              searchParams.get("popular") && "bg-indigo-500 text-slate-100"
            )}
          >
            Popular
          </li>
        </ul>
        {userInfo && mounted && (
          <ul className="border rounded-md flex  divide-x w-fit">
            <li
              className={clsx(
                "px-2 cursor-pointer rounded-l-md",
                searchParams.get("status") === "inProgress" &&
                  "bg-indigo-500 text-slate-100"
              )}
              onClick={() => setParams("status", "inProgress")}
            >
              In progress
            </li>
            <li
              onClick={() => setParams("status", "complete")}
              className={clsx(
                "px-2 cursor-pointer rounded-r-md",
                searchParams.get("status") === "complete" &&
                  "bg-indigo-500 text-slate-100"
              )}
            >
              Complete
            </li>
          </ul>
        )}
      </div>
      <h2 className="text-center text-lg mb-4">Roadmaps</h2>

      {/* roadmap */}
      {isLoading ? (
        <RoadmapListSkeleton />
      ) : error ? (
        <h3 className="text-center ">Failed to load roadmaps</h3>
      ) : (
        <RoadmapLIst roadmaps={data ?? []} />
      )}
    </div>
  );
};

export default Roadmaps;
