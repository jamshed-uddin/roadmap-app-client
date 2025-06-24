export type UserInfo = {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  token: string;
  __v?: number;
};

export type ItemType = {
  _id: string;
  title: string;
  type: string;
  roadmapId: string;
  subtopicTo: string | null;
  description: string;
  items: ItemType[];
};

export type RoadmapType = {
  _id: string;
  title: string;
  description: string;
  items: ItemType[];
  upvoteCount: number;
  totalItems: number;
};

export type UpvoteType = {
  _id: string;
  userId: string;
  itemId: string;
};
export type CommentType = {
  _id: string;
  itemId: string;
  userId: Pick<UserInfo, "name" | "_id">;
  replyTo: string;
  content: string;
  replies: CommentType[];
};

export type ProgressType = {
  _id: string;
  userId: string;
  roadmapId: string;
  itemId: string;
  status: "inProgress" | "complete";
};
