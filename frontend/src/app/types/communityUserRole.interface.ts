import { Community } from "./community.interface";
import { User } from "./user.interface";

export interface CommunityUserRole {
  id?: number;
  userInfoId: number;
  communityId: number;
  communityRole: string;
  community?: Community;
  userInfo?: User;
}
