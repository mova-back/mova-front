export type Tag = string;

type Word = {
  updatedAt: string;
  _id: string;
  wordname: string;
  userId: string;
  meaning: string;
  description: string;
  createdAt: string;
  tags: Tag[];
  likes: string[];
  dislikes: string[];
};

export default Word;
