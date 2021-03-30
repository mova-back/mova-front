export type Tag = string;

interface Word {
  updatedAt: string;
  createdAt: string;
  _id: string;
  wordname: string;
  createdByUserId: string;
  meaning: string;
  description: string;
  swearing: boolean;
  tags: Tag[];
  likes: string[];
  dislikes: string[];
  favoriteByUserdIds: string[]; // TODO rename
}

export default Word;
