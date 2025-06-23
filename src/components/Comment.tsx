"use client";
import { CommentType } from "@/definition";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import React, { useState } from "react";
import CommentInput from "./CommentInput";

const Comment = ({ comment }: { comment: CommentType }) => {
  const [openReplies, setOpenReplies] = useState(true);
  const [openReplyInput, setOpenReplyInput] = useState(false);
  const [openEditInput, setOpenEditInput] = useState(false);
  return (
    <div className="">
      <div className=" mb-3">
        <div className="bg-gray-200 p-2 rounded-lg ">
          <h3 className="text-xs font-semibold">{comment.userId.name}</h3>
          <p>{comment.content}</p>
          <div className="flex items-center gap-2 text-xs font-semibold mt-2">
            <button onClick={() => setOpenReplyInput((p) => !p)}>Reply</button>
            <button onClick={() => setOpenEditInput((p) => !p)}>Edit</button>
            <button>Delete</button>
          </div>
        </div>
        {openReplyInput && (
          <div className="mt-2">
            <CommentInput
              itemId={comment.itemId}
              replyTo={comment._id}
              onCancelClick={() => setOpenReplyInput(false)}
            />
          </div>
        )}
        {openEditInput && (
          <div className="mt-2">
            <CommentInput
              itemId={comment.itemId}
              content={comment.content}
              onCancelClick={() => setOpenEditInput(false)}
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
            <Comment comment={comment} />
          </div>
        ))}
    </div>
  );
};

export default Comment;
