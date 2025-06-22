"use client";

import Button from "@/components/Button";
import { useGetRoadmapItemQuery } from "@/redux/api/roadmapItemApi";
import {
  ArrowUpIcon,
  ChatBubbleOvalLeftIcon,
} from "@heroicons/react/24/outline";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const RoadmapItemDetails = () => {
  const { roadmapItemId } = useParams();
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const {
    data: item,
    error,
    isLoading,
  } = useGetRoadmapItemQuery(roadmapItemId as string);

  const [commentInput, setCommentInput] = useState("");

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }
  }, [commentInput]);

  if (isLoading) {
    return <h1>loading...</h1>;
  }

  if (error) {
    return <h2>Something went wrong!</h2>;
  }

  return (
    <div className="space-y-5">
      <div>
        <h4 className="text-3xl font-medium mb-3">{item?.title}</h4>
        <p className="text-lg">{item?.description}</p>
      </div>
      <div className="space-x-3">
        <button className="bg-gray-200 p-2 rounded-lg">
          <ArrowUpIcon className="w-4 h-4" />
        </button>
        <button className="bg-gray-200 p-2 rounded-lg">
          <ChatBubbleOvalLeftIcon className="w-4 h-4" />
        </button>
      </div>
      <div className="flex items-center gap-2">
        <textarea
          ref={textAreaRef}
          className={`lg:w-1/3 input border rounded-md  text-sm p-1 py-2  w-full max-h-32 overflow-y-auto focus:outline-0  resize-none hide-scrollbar`}
          rows={1.5}
          placeholder="Message"
          onChange={(e) => setCommentInput(e.target.value)}
        />
        <Button>Comment</Button>
      </div>
    </div>
  );
};

export default RoadmapItemDetails;
