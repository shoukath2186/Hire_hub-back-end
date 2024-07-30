import { Document } from "mongoose";

interface IUser {
  user_name: string;
  last_name: string;
  phone: number;
  email: string;
  password: string;
  user_role: string;
  otp_verify?: boolean;
  profilePicture?: string;
  isBlocked?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export default IUser;
