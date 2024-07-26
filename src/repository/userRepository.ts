

import UserRepo from "../usecase/interfaces/users/inUserRepo";
import UserModel from "../frameworks/models/userModel"; // Assuming Mongoose model
import User from "../entities/user"; // Assuming this is your User entity

class UserRepository implements UserRepo {
    
  async findByEmail(email: string): Promise<User | null> {
    const userData = await UserModel.findOne({ email: email });
    return userData ? (userData.toObject() as User) : null;
  }

//   async findUserName(userName: string): Promise<User | null> {
//     const userData = await UserModel.findOne({ userName: userName });
//     return userData ? (userData.toObject() as User) : null;
//   }

//   async saveUser(user: User): Promise<User | null> {
//     const newUser = new UserModel(user);
//     const savedUser = await newUser.save();
//     return savedUser ? (savedUser.toObject() as User) : null;
//   }

//   async saveOtp(
//     email: string,
//     otp: string,
//     userName: string,
//     displayName: string,
//     password: string
//   ): Promise<any> {
//     // Assuming you store OTPs in a separate collection or within the user document
//     // Adjust as per your schema
//     const otpData = { email, otp, userName, displayName, password };
//     const savedOtp = await UserModel.updateOne({ email }, { $set: { otpData } }, { upsert: true });
//     return savedOtp;
//   }

//   async findOtpByEmail(email: string): Promise<any> {
//     // Assuming OTPs are stored within the user document or in a separate collection
//     const user = await UserModel.findOne({ email });
//     return user?.otpData;
//   }

//   async deleteOtpByEmail(email: string): Promise<any> {
//     // Assuming OTPs are stored within the user document
//     const result = await UserModel.updateOne({ email }, { $unset: { otpData: 1 } });
//     return result;
//   }

//   async findById(id: string): Promise<User | null> {
//     const userData = await UserModel.findById(id);
//     return userData ? (userData.toObject() as User) : null;
//   }

//   async updateUser(user: User): Promise<User | null> {
//     const updatedUser = await UserModel.findByIdAndUpdate(user.id, user, { new: true });
//     return updatedUser ? (updatedUser.toObject() as User) : null;
//   }
}

export default UserRepository;
