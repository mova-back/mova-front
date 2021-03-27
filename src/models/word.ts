export type Tag = string;

type Word = {
  updatedAt: string;
  _id: string;
  wordname: string;
  createdByUserId: string;
  meaning: string;
  description: string;
  createdAt: string;
  tags: Tag[];
  likes: string[];
  dislikes: string[];
  favoriteByUserdIds: string[]; // TODO rename
};

export default Word;
