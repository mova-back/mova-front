export type Tag = string;

type Word = {
  updatedAt: string;
  id: string;
  wordname: string;
  userId: string;
  meaning: string;
  extended_description: string;
  createdAt: string;
  tags: Tag[];
  likes: number;
  dislikes: number;
};

export default Word;
