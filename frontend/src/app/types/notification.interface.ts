import { User } from "./user.interface";

export interface Notifications {
    id?: any;
    uderId: User;
    message: string;
    readStatus: boolean;
    createdAt: Date;
}
