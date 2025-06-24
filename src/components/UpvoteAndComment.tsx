"use client";

import {
  useDeleteUpvoteMutation,
  useGetUpvotesQuery,
  useSaveUpvoteMutation,
} from "@/redux/api/upvoteApi";
import {
  ChatBubbleOvalLeftIcon,
  ChevronDoubleUpIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import React, { useEffect, useState } from "react";

import toast from "react-hot-toast";

import Comment from "./Comment";
import CommentInput from "./CommentInput";
import { useGetCommentsQuery } from "@/redux/api/commentApi";
import { useAppSelector } from "@/hooks/hook";
import Link from "next/link";

const UpvoteAndComment = ({ itemId }: { itemId: string }) => {
  const { userInfo } = useAppSelector((state) => state.user);
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
    !!upvotes?.find((item) => item.userId === (userInfo?._id as string))
  );

  useEffect(() => {
    const isUpvoted =
      !upvotesLoading &&
      upvotes?.find((item) => item.userId === (userInfo?._id as string));

    setAlreadyUpvoted(!!isUpvoted);
  }, [upvotes, upvotesLoading, userInfo?._id]);

  const handleUpvote = async () => {
    if (!userInfo) return;
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
    <div>
      <div className=" relative ">
        <div className="space-x-3 flex items-center">
          <button
            disabled={upvoteSaveLoading || upvoteDeleteLoading || !userInfo}
            onClick={handleUpvote}
            className={clsx(
              " p-2 rounded-lg flex items-center gap-1",
              !upvotesLoading && alreadyUpvoted
                ? "bg-indigo-100"
                : "bg-gray-200"
            )}
          >
            {upvotesLoading ? (
              <span className=" h-4 w-4 bg-gray-200 rounded-lg"></span>
            ) : (
              <>
                <ChevronDoubleUpIcon
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
        <div className="lg:w-1/2 mt-4">
          <CommentInput itemId={itemId} />
        </div>

        {!userInfo && (
          <div className=" absolute inset-0 z-10 bg-slate-100/50 lg:w-1/2 flex justify-center items-center">
            <h3 className="text-sm font-semibold">
              <Link href={"/login"} className="text-indigo-600">
                Login
              </Link>{" "}
              to upvote or comment
            </h3>
          </div>
        )}
      </div>

      <div className="space-y-2  lg:w-1/2 w-full mt-10">
        {commentsLoading ? (
          <h3>Loading...</h3>
        ) : (
          comments?.map((comment) => (
            <Comment key={comment._id} comment={comment} />
          ))
        )}
      </div>
    </div>
  );
};

export default UpvoteAndComment;
