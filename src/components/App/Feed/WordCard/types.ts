export interface WordCardProps {
  isLiked: boolean;
  wordname: string;
  isDisliked: boolean;
  meaning: string;
  description: string;
  tags: string[];
  createdAt: string;
  userId: string;
  className?: string;
  _id: string;
  likes: number;
  dislikes: number;
}
