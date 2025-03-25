import { User } from "./user.interface";

export interface CommentsInterface {
    id?: number;
    // imageUrl: string;
    postId: number;
    userId: number;
    userInfo?: User;
    name: string;
    description: string;
    numberOfLikes: number;
    date: Date;
}