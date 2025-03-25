import { CommentsInterface } from "./comments.interface";
import { User } from "./user.interface";

export interface PostInterface {
    id?: number;
    imageUrl: string;
    name: string;
    description: string;
    reports?: Report[];
    postLikes?: LikeInterface[];
    userInfo?: User;
    userInfoId: number;
    comments?: CommentsInterface[];
    date: Date;
}

export interface LikeInterface {
  id?: number;
  userId: number;
  postId: number;
  date: Date;
}