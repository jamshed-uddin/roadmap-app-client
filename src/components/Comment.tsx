"use client";
import { CommentType } from "@/definition";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import React, { useState } from "react";
import CommentInput from "./CommentInput";
import { useAppSelector } from "@/hooks/hook";
import { useDeleteCommentMutation } from "@/redux/api/commentApi";
import Spinner from "./Spinner";
import toast from "react-hot-toast";

const Comment = ({
  comment,
  level = 1,
}: {
  comment: CommentType;
  level?: number;
}) => {
  const [openReplies, setOpenReplies] = useState(true);
  const [openReplyInput, setOpenReplyInput] = useState(false);
  const [openEditInput, setOpenEditInput] = useState(false);
  const { userInfo } = useAppSelector((state) => state.user);
  const [deleteComment, { isLoading: deleteCommentLoading }] =
    useDeleteCommentMutation();

  const handleDeleteComment = async () => {
    try {
      const res = await deleteComment(comment._id);
      if (res.error) {
        toast.error("Failed to delete comment");
      }
    } catch {
      toast.error("Failed to delete comment");
    }
  };

  return (
    <div className="">
      <div className=" mb-3">
        <div className="bg-gray-200 p-2 rounded-lg ">
          <h3 className="text-xs font-semibold">
            {comment.userId.name || "[UpTrack user]"}
          </h3>{" "}
          <p>{comment.content}</p>
          {userInfo && (
            <div className="flex items-center gap-2 text-xs font-semibold mt-2">
              {level < 3 && (
                <button onClick={() => setOpenReplyInput((p) => !p)}>
                  Reply
                </button>
              )}
              {comment.userId._id === userInfo?._id && (
                <>
                  <button onClick={() => setOpenEditInput((p) => !p)}>
                    Edit
                  </button>
                  <button
                    onClick={handleDeleteComment}
                    disabled={deleteCommentLoading}
                    className="flex items-center gap-1"
                  >
                    <span>Delete</span>{" "}
                    {deleteCommentLoading && (
                      <Spinner borderColor="black" variant="small" />
                    )}
                  </button>
                </>
              )}
            </div>
          )}
        </div>
        {openReplyInput && (
          <div className="mt-2">
            <CommentInput
              itemId={comment.itemId}
              replyTo={comment._id}
              onCancelClick={() => setOpenReplyInput(false)}
              onCommentSave={() => setOpenReplyInput(false)}
            />
          </div>
        )}
        {openEditInput && (
          <div className="mt-2">
            <CommentInput
              commentId={comment._id}
              itemId={comment.itemId}
              content={comment.content}
              onCancelClick={() => setOpenEditInput(false)}
              onCommentSave={() => setOpenEditInput(false)}
            />
          </div>
        )}
        {!!comment?.replies?.length && (
          <button
            onClick={() => setOpenReplies((p) => !p)}
            className="text-xs font-semibold"
          >
            Replies
            <span>
              <ChevronRightIcon
                className={clsx(
                  "w-3 h-3 inline transition-all duration-300",
                  openReplies ? "rotate-90" : "rotate-0"
                )}
              />
            </span>
          </button>
        )}
      </div>
      {openReplies &&
        comment?.replies?.map((comment) => (
          <div key={comment._id} className="ml-5">
            {" "}
            <Comment comment={comment} level={level + 1} />
          </div>
        ))}
    </div>
  );
};

export default Comment;
