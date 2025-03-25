import { Community } from "../../app/types/community.interface";
import { User } from "../../app/types/user.interface";
import { Donations } from "./donation.interface";

export interface Dashboard {
  reportedContent: number;
  totalCommunities: Community[];
  totalDonations: Donations[];
  totalUsers: User[];

}
