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
import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import toast from "react-hot-toast";

const UpvoteAndComment = ({ itemId }: { itemId: string }) => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const { data: upvotes, isLoading: upvotesLoading } = useGetUpvotesQuery(
    itemId as string
  );

  const [saveUpvote, { isLoading: upvoteSaveLoading }] =
    useSaveUpvoteMutation();
  const [deleteUpvote, { isLoading: upvoteDeleteLoading }] =
    useDeleteUpvoteMutation();

  const [commentInput, setCommentInput] = useState("");
  const [alreadyUpvoted, setAlreadyUpvoted] = useState<boolean>(
    !!upvotes?.find((item) => item.itemId === itemId)
  );

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }
  }, [commentInput]);

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
      <div className="flex items-center gap-2">
        <textarea
          ref={textAreaRef}
          className={`lg:w-1/3 input border rounded-md  text-sm p-1 py-2  w-full max-h-32 overflow-y-auto focus:outline-0 focus:border-indigo-600  resize-none hide-scrollbar`}
          rows={1.5}
          placeholder="Your comment"
          onChange={(e) => setCommentInput(e.target.value)}
        />
        <Button>Comment</Button>
      </div>
    </>
  );
};

export default UpvoteAndComment;
