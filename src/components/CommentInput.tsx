"use client";
import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import {
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} from "@/redux/api/commentApi";
import toast from "react-hot-toast";

interface CommentInputPropsType {
  itemId: string;
  replyTo?: string | null;
  content?: string;
  onCancelClick?: () => void;
}

const CommentInput = ({
  itemId,
  replyTo = null,
  content,
  onCancelClick,
}: CommentInputPropsType) => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [commentInput, setCommentInput] = useState("");

  const [createComment, { isLoading: createCommentLoading }] =
    useCreateCommentMutation();
  const [updateComment, { isLoading: updateCommentLoading }] =
    useUpdateCommentMutation();
  const [deleteComment, { isLoading: deleteCommentLoading }] =
    useDeleteCommentMutation();

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }
  }, [commentInput]);

  const handleSaveComment = () => {
    try {
      if (content) {
        const editedContent = {
          content: commentInput || content,
        };

        console.log(editedContent);
        //   setCommentInput('')
      } else {
        if (!commentInput) return;
        const comment = {
          itemId,
          content: commentInput,
          replyTo,
        };

        console.log(comment);
        createComment(comment);

        setCommentInput("");
      }
    } catch {
      toast(`Failed to ${content ? "edit" : "create"} comment`);
    }
  };

  return (
    <div className=" gap-2 w-full">
      <textarea
        ref={textAreaRef}
        className={`  input border rounded-md  text-sm p-1 py-2  w-full max-h-32 overflow-y-auto focus:outline-0 focus:border-indigo-600  resize-none hide-scrollbar`}
        rows={1.5}
        placeholder="Your comment"
        onChange={(e) => setCommentInput(e.target.value)}
        defaultValue={content}
      />
      <div className=" flex justify-end gap-2">
        <Button onClick={onCancelClick} variant="secondary">
          Cancel
        </Button>
        <Button
          onClick={handleSaveComment}
          disabled={createCommentLoading || updateCommentLoading}
          loading={createCommentLoading || updateCommentLoading}
        >
          Comment
        </Button>
      </div>
    </div>
  );
};

export default CommentInput;
