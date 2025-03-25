import { PostInterface } from "./postInterface.interface";
import { User } from "./user.interface";

export interface ReportData {
  id?: number;
  reason: ReportReason;
  post?: PostInterface;
  postId: number;
  description: string;
  createdAt: Date;
  reviewedAt?: Date;
  userId: number;
  user?: User;
}

export enum ReportReason {
  InappropriateContent = "InappropriateContent",
  Spam = "Spam",
  OffensiveLanguage = "OffensiveLanguage",
  Other = "Other"
}




