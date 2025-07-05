"use client";

import {
  useDeleteUpvoteMutation,
  useGetUpvotesQuery,
  useSaveUpvoteMutation,
} from "@/redux/api/upvoteApi";
import { ChevronDoubleUpIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import React, { useEffect, useState } from "react";

import toast from "react-hot-toast";

import Comment from "./Comment";
import CommentInput from "./CommentInput";
import { useGetCommentsQuery } from "@/redux/api/commentApi";
import { useAppSelector } from "@/hooks/hook";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const UpvoteAndComment = ({ itemId }: { itemId: string }) => {
  const [mounted, setMounted] = useState(false);

  // pathname and query params to construct url to set as callback url in login redirection
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPath =
    pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");

  //  userinfo
  const { userInfo } = useAppSelector((state) => state.user);

  // upvote query
  const { data: upvotes, isLoading: upvotesLoading } = useGetUpvotesQuery(
    itemId as string
  );

  // upvote and remove upvote hook
  const [saveUpvote, { isLoading: upvoteSaveLoading }] =
    useSaveUpvoteMutation();
  const [deleteUpvote, { isLoading: upvoteDeleteLoading }] =
    useDeleteUpvoteMutation();

  // get all comments query
  const {
    data: comments,
    isLoading: commentsLoading,
    error: commentLoadingError,
  } = useGetCommentsQuery(itemId);

  const [alreadyUpvoted, setAlreadyUpvoted] = useState<boolean>(
    !!upvotes?.find((item) => item.userId === (userInfo?._id as string))
  );

  // setting already upvoted state
  useEffect(() => {
    const isUpvoted =
      !upvotesLoading &&
      upvotes?.find((item) => item.userId === (userInfo?._id as string));

    setAlreadyUpvoted(!!isUpvoted);
  }, [upvotes, upvotesLoading, userInfo?._id]);

  // to avoid hydration error
  useEffect(() => {
    setMounted(true);
  }, []);

  // upvote and remove upvote handler
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
      toast.error("Failed to upvote");
      setAlreadyUpvoted((p) => !p);
    }
  };

  // to avoid hydration error
  if (!mounted) return null;

  return (
    <div>
      <div className=" relative ">
        <div className="space-x-3 flex items-center">
          {upvotesLoading ? (
            <span className="block animate-pulse h-7 w-7 bg-gray-200 rounded"></span>
          ) : (
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
              <ChevronDoubleUpIcon
                className={clsx(
                  "w-4 h-4 ",
                  !upvotesLoading && alreadyUpvoted ? "text-blue-600" : ""
                )}
              />
              <span className="text-xs">{upvotes?.length}</span>
            </button>
          )}
        </div>
        <div className="lg:w-1/2 mt-4">
          <CommentInput itemId={itemId} />
        </div>

        {!userInfo && itemId && (
          <div className=" absolute inset-0 z-10 bg-slate-100/50 lg:w-1/2 flex justify-center items-center">
            <h3 className="text-sm font-semibold">
              <Link
                href={`/login?callbackUrl=${encodeURIComponent(currentPath)}`}
                className="text-indigo-600"
              >
                Login
              </Link>{" "}
              to upvote or comment
            </h3>
          </div>
        )}
      </div>

      {/* comments */}
      <div className="space-y-2  lg:w-1/2 w-full mt-10">
        {commentsLoading ? (
          commentLoadingError ? (
            <h3>Failed to load comments</h3>
          ) : (
            <h3>Comments loading...</h3>
          )
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
