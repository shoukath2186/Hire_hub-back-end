

import UserRepo from "../usecase/interfaces/users/inUserRepo";
import UserModel from "../frameworks/models/userModel"; 
import OtpModel from '../frameworks/models/OTPModel'
import User from "../entities/user"; 


import { ObjectId } from 'mongodb';
class UserRepository implements UserRepo {
    
  async findByEmail(email: string): Promise<User | null> {
    const userData = await UserModel.findOne({ email: email });
    return userData ? (userData.toObject() as User) : null;
  }

  async saveUser(user: User): Promise<User | null> {
    
    const newUser = new UserModel(user);
    const savedUser = await newUser.save();
    
    return savedUser ? (savedUser.toObject() as User) : null;
  }

  async saveOtp(
    email: string,
    otp: string,
  ): Promise<any> {

    try {
     
      const otpData = new OtpModel({ email, otp });
      
      const savedOtp = await otpData.save();
      
      return savedOtp;

    } catch (error) {
      console.error('Error saving OTP data:', error);
      throw error; 
    }
  }

  async deleteOtp(id: string | ObjectId) {
    try {
      const result = await OtpModel.deleteOne({ _id: id });
      // console.log(result);
    } catch (error) {
      console.log(error);
      
    }
   
        
  }

  async checkExistOtp(email:string){
    try {
      
      const otpData = await OtpModel.findOne({ email });
      const userData = await UserModel.findOne({ email });
       if(!userData){
        return 'User does not exist.'
      }
      if (!otpData) {
          return 'Email does not exist.';
      }

      return otpData.otp;
      
  } catch (error) {
      console.error('Error checking OTP:', error);
      return 'An error occurred while verifying OTP.';
  }

  }

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
