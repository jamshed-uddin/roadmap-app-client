"use client";
import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import {
  useCreateCommentMutation,
  useUpdateCommentMutation,
} from "@/redux/api/commentApi";
import toast from "react-hot-toast";
import { useAppSelector } from "@/hooks/hook";

interface CommentInputPropsType {
  commentId?: string;
  itemId: string;
  replyTo?: string | null;
  content?: string;
  onCancelClick?: () => void;
  onCommentSave?: () => void;
}

const CommentInput = ({
  commentId,
  itemId,
  replyTo = null,
  content,
  onCancelClick,
  onCommentSave,
}: CommentInputPropsType) => {
  const { userInfo } = useAppSelector((state) => state.user);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [commentInput, setCommentInput] = useState("");

  const [createComment, { isLoading: createCommentLoading }] =
    useCreateCommentMutation();
  const [updateComment, { isLoading: updateCommentLoading }] =
    useUpdateCommentMutation();

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }
  }, [commentInput]);

  useEffect(() => {
    if (content) {
      setCommentInput(content);
    }
  }, [content]);

  const handleSaveComment = async () => {
    if (!userInfo) return;
    try {
      if (content) {
        const editedContent = {
          content: commentInput,
        };

        console.log(editedContent);
        const res = await updateComment({
          id: commentId as string,
          content: commentInput,
          userId: userInfo?._id as string,
        });

        if (res.error) {
          return toast.error("Failed to edit comment");
        }

        onCommentSave?.();
        setCommentInput("");
      } else {
        if (!commentInput) return;
        const comment = {
          itemId,
          content: commentInput,
          replyTo,
        };

        const res = await createComment(comment);
        if (res.error) {
          return toast.error("Failed to post comment");
        }
        setCommentInput("");
      }
    } catch {
      toast.error(`Failed to ${content ? "edit" : "create"} comment`);
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
        value={commentInput}
      />
      <div className=" flex justify-end gap-2">
        <Button
          onClick={() => {
            onCancelClick?.();
            setCommentInput("");
          }}
          variant="secondary"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSaveComment}
          disabled={createCommentLoading || updateCommentLoading || !userInfo}
          loading={createCommentLoading || updateCommentLoading}
        >
          Comment
        </Button>
      </div>
    </div>
  );
};

export default CommentInput;
