"use client";

import { ItemDetailsSkeleton } from "@/components/Skeletons";
import Spinner from "@/components/Spinner";
import UpvoteAndComment from "@/components/UpvoteAndComment";
import {
  useGetItemProgressQuery,
  useSaveProgressMutation,
  useUpdateProgressMutation,
} from "@/redux/api/progressApi";
import { useGetRoadmapItemQuery } from "@/redux/api/roadmapItemApi";
import { useParams } from "next/navigation";
import React, { ChangeEvent } from "react";
import toast from "react-hot-toast";

const RoadmapItemDetails = () => {
  const { roadmapItemId } = useParams();

  const [updateProgress, { isLoading: progressUpdateLoading }] =
    useUpdateProgressMutation();
  const [saveProgress, { isLoading: saveProgressLoading }] =
    useSaveProgressMutation();

  const {
    data: item,
    error,
    isLoading,
  } = useGetRoadmapItemQuery(roadmapItemId as string);
  const {
    data: progress,
    isLoading: roadmapItemProgressLoading,
    error: roadmapItemProgressError,
    refetch: progressRefetch,
  } = useGetItemProgressQuery({ itemId: roadmapItemId as string });

  const handleProgress = async (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedStatus = e.target.value;
    try {
      if (progress?.progress.status) {
        const data = await updateProgress({
          status: selectedStatus,
          progressId: progress?.progress._id,
        });
        if (data?.error) {
          progressRefetch();
          return toast.error("Failed to update status");
        }

        return;
      }

      const data = await saveProgress({
        roadmapId: item?.roadmapId as string,
        itemId: item?._id as string,
        status: selectedStatus,
      });

      if (data?.error) {
        progressRefetch();
        return toast.error("Failed to save status");
      }
    } catch {
      toast.error("Failed to save status");
      progressRefetch();
    }
  };

  if (isLoading) {
    return <ItemDetailsSkeleton />;
  }

  if (error) {
    return <h2>Something went wrong!</h2>;
  }

  return (
    <div className="space-y-8">
      <div>
        <div className="flex justify-end">
          {!roadmapItemProgressLoading && !roadmapItemProgressError && (
            <div className="relative">
              <select
                name="status"
                id=""
                className="border border-black focus:outline-indigo-500 rounded-xl p-1 text-sm cursor-pointer"
                defaultValue={progress?.progress.status}
                onChange={handleProgress}
                disabled={
                  roadmapItemProgressLoading ||
                  saveProgressLoading ||
                  progressUpdateLoading
                }
              >
                <option value="pending">Pending</option>
                <option value="inProgress">In progress</option>
                <option value="complete">Complete</option>
              </select>
              {progressUpdateLoading ||
                (saveProgressLoading && (
                  <Spinner
                    borderColor="black"
                    className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 "
                  />
                ))}
            </div>
          )}
        </div>
        <h4 className="text-2xl lg:text-3xl font-medium mb-3">{item?.title}</h4>
        <p className="text-base lg:text-lg">{item?.description}</p>
      </div>
      <UpvoteAndComment itemId={roadmapItemId as string} />
    </div>
  );
};

export default RoadmapItemDetails;
