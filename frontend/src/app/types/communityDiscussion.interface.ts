import { communityMessage } from './communityMessage.interface';
import { Community } from "./community.interface";
import { User } from "./user.interface";

export interface CommunityDiscussion {
  id?: number;
  title: string;
  description: string;
  subscriptionChannel?: string;
  communityMessages?: communityMessage[];
  communityId?: number;
  userInfoId?: number;
  community?: Community;
  userInfo?: User;
}
