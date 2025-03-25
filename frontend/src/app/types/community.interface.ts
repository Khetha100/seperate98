import { User } from "./user.interface";

export interface Community {
  id?: number;
  name: string;
  description: string;
  pubOrPriv: string;
  communityPicture: string;
  communityMembersNumber: number;
  communityCreatorId: number;
  users?: User[];
}
