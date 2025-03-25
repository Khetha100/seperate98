import { Community } from "./community.interface";
import { SubjectSelection } from "./grade-selection.interface";
import { PostInterface } from "./postInterface.interface";

export interface User {
  id: number;
  firstName?: string;
  lastName?: string;
  bio?: string;
  phone?: string;
  saceNumber?: string;
  imageUrl?: string;
  password?: string;
  role?: 'STUDENT' | 'TEACHER';
  subjects?: SubjectSelection[];
  badges: string;
  grade: number | null;
  communities: Community[];
  posts: PostInterface[];
  connections: User[];
  isTemporarilyDeleted?: boolean;
}

// export interface UserProfile extends User {
//   subjects: string[];
//   grade: string;
// }


export interface signinResponse{
  status: string;
  userInfo: User;
}
