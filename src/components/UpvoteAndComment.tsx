"use client";

import {
  useDeleteUpvoteMutation,
  useGetUpvotesQuery,
  useSaveUpvoteMutation,
} from "@/redux/api/upvoteApi";
import {
  ArrowUpIcon,
  ChatBubbleOvalLeftIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import React, { useEffect, useState } from "react";

import toast from "react-hot-toast";

import Comment from "./Comment";
import CommentInput from "./CommentInput";
import { useGetCommentsQuery } from "@/redux/api/commentApi";

const UpvoteAndComment = ({ itemId }: { itemId: string }) => {
  const { data: upvotes, isLoading: upvotesLoading } = useGetUpvotesQuery(
    itemId as string
  );

  const [saveUpvote, { isLoading: upvoteSaveLoading }] =
    useSaveUpvoteMutation();
  const [deleteUpvote, { isLoading: upvoteDeleteLoading }] =
    useDeleteUpvoteMutation();

  const { data: comments, isLoading: commentsLoading } =
    useGetCommentsQuery(itemId);

  console.log(comments);

  const [alreadyUpvoted, setAlreadyUpvoted] = useState<boolean>(
    !!upvotes?.find((item) => item.itemId === itemId)
  );

  useEffect(() => {
    const isUpvoted =
      !upvotesLoading && upvotes?.find((item) => item.itemId === itemId);

    setAlreadyUpvoted(!!isUpvoted);
  }, [itemId, upvotes, upvotesLoading]);

  const handleUpvote = async () => {
    try {
      if (alreadyUpvoted) {
        setAlreadyUpvoted((p) => !p);
        deleteUpvote(itemId);
      } else {
        setAlreadyUpvoted((p) => !p);
        saveUpvote({ itemId });
      }
    } catch {
      toast("Failed to upvote");
      setAlreadyUpvoted((p) => !p);
    }
  };

  return (
    <>
      <div className="space-x-3 flex items-center">
        <button
          disabled={upvoteSaveLoading || upvoteDeleteLoading}
          onClick={handleUpvote}
          className={clsx(
            " p-2 rounded-lg flex items-center gap-1",
            !upvotesLoading && alreadyUpvoted ? "bg-indigo-100" : "bg-gray-200"
          )}
        >
          {upvotesLoading ? (
            <div className="h-4 w-4 bg-gray-200 rounded-lg"></div>
          ) : (
            <>
              <ArrowUpIcon
                className={clsx(
                  "w-4 h-4 ",
                  !upvotesLoading && alreadyUpvoted ? "text-blue-600" : ""
                )}
              />
              <span className="text-xs">{upvotes?.length}</span>
            </>
          )}
        </button>
        <button className="bg-gray-200 p-2 rounded-lg flex items-center">
          <ChatBubbleOvalLeftIcon className="w-4 h-4" />
        </button>
      </div>
      <div className="w-1/2 ">
        <CommentInput itemId={itemId} />
      </div>

      <div className="space-y-2  lg:w-1/2 w-full">
        {comments?.map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))}
      </div>
    </>
  );
};

export default UpvoteAndComment;
