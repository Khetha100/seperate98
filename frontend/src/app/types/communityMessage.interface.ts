import { CommunityDiscussion } from "./communityDiscussion.interface";

export interface communityMessage {
  id?: number;
  // messageId?: number;
  senderId: number;
  content: string;
  date: Date;
  discussion: CommunityDiscussion;
  // discussion?: CommunityDiscussion;
  communityId: number;
  subscriptionChannel:string;
}
