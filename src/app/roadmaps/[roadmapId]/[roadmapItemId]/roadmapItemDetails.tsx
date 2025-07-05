"use client";

import Spinner from "@/components/Spinner";
import UpvoteAndComment from "@/components/UpvoteAndComment";
import { ItemType } from "@/definition";
import { useAppSelector } from "@/hooks/hook";
import {
  useGetItemProgressQuery,
  useSaveProgressMutation,
  useUpdateProgressMutation,
} from "@/redux/api/progressApi";

import React, { ChangeEvent } from "react";
import toast from "react-hot-toast";

const RoadmapItemDetails = ({ item }: { item: ItemType }) => {
  const { userInfo } = useAppSelector((state) => state.user);

  const [updateProgress, { isLoading: progressUpdateLoading }] =
    useUpdateProgressMutation();
  const [saveProgress, { isLoading: saveProgressLoading }] =
    useSaveProgressMutation();

  // getting progress record of user on this item
  const {
    data: progress,
    isLoading: roadmapItemProgressLoading,
    error: roadmapItemProgressError,
    refetch: progressRefetch,
  } = useGetItemProgressQuery(
    { itemId: item._id as string },
    { skip: !userInfo }
  );

  // saving and updating progress status
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
        roadmapId: item?.roadmapId._id as string,
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

  return (
    <div className="space-y-8">
      <div>
        {/* progress  */}
        {!roadmapItemProgressLoading &&
          !roadmapItemProgressError &&
          item &&
          progress && (
            <div className="flex justify-end">
              {/* progress select */}
              <div className="relative">
                <select
                  name="status"
                  id=""
                  className="border border-gray-500 focus:outline-indigo-500 rounded-xl py-0.5 px-1 text-sm cursor-pointer"
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
            </div>
          )}
        {/* title , description */}
        <h4 className="text-2xl lg:text-3xl font-medium mb-3">{item?.title}</h4>
        <p className="text-base lg:text-lg">{item?.description}</p>
      </div>
      <UpvoteAndComment itemId={item._id as string} />
    </div>
  );
};

export default RoadmapItemDetails;
