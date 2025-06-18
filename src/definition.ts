export type ItemType = {
  id: string;
  title: string;
  type: string;
  subtopicTo: string | null;
  description: string;
  items: ItemType[];
};
