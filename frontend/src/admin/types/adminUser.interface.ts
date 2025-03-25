


import { User } from "../../app/types/user.interface";


export interface signinResponse{
  status: string;
  userInfo: User;
}
export default interface adminUser{
  id?: number;
  firstName?: string;
  lastName?: string;
  phone?: string;

  password?: string;
}
