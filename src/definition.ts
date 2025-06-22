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
};
