import { Complaint } from '../../../../services/FeedService';

export interface WordCardInterface {
  isLiked: boolean;
  isFavourited: boolean;
  wordname: string;
  isDisliked: boolean;
  meaning: string;
  description: string;
  tags: string[];
  createdAt: string;
  createdByUserId: string;
  className?: string;
  swearing: boolean;
  _id: string;
  likes: number;
  dislikes: number;
}

export interface ModeratorWordCardInterface extends WordCardInterface {
  complaints: Complaint[];
}
