
import User from "../entities/user";
import EncryptOtp from "../frameworks/utils/bcryptOtp";
import EncryptPassword from "../frameworks/utils/bcryptPassword";
// import cloudinary from "../frameworks/utils/cloudinaryConfig";
import GenerateOtp from "../frameworks/utils/generateOtp";
import JWTToken from "../frameworks/utils/generateToken";
import sendOtp from "../frameworks/utils/sentMail";
import UserRepository from "../repository/userRepository";
import { OtpData } from "./interfaces/users/InOtp";



import { ObjectId } from 'mongodb';

class UserUsecase {
  private _userRepository: UserRepository;
  private _generateOtp: GenerateOtp;
  private _encryptPassword: EncryptPassword;
  private _encryptOtp: EncryptOtp;
  private _generateMail: sendOtp;
  private _jwtToken: JWTToken;
  constructor(
    UserRepository: UserRepository,
    generateOtp: GenerateOtp,
    encryptPassword: EncryptPassword,
    encryptOtp: EncryptOtp,
    generateMail: sendOtp,
    jwtToken: JWTToken,
  ) {
    this._userRepository = UserRepository;
    this._generateOtp = generateOtp;
    this._encryptPassword = encryptPassword;
    this._encryptOtp = encryptOtp;
    this._generateMail = generateMail;
    this._jwtToken = jwtToken;
  }

  async checkExist(email: string) {
    try {
      const userExist = await this._userRepository.findByEmail(email);
      if (userExist) {
        return {
          status: 400,
          message: "User already exist",
        };
      } else {
        return {
          status: 200,
          message: "User does not exist",
        };
      }
    } catch (error) {
      return {
        status: 400,
        message: "An error occurred",
      };
    }
  }

  async signup(
    user_name: string, last_name: string, phone: number, email: string, password: string, user_role: string
  ) {
    try {
      const otp = this._generateOtp.createOtp();

      const hashedPassword: string = await this._encryptPassword.encrypt(password);

      const userDate: User = {
        user_name,
        last_name,
        email,
        phone,
        password: hashedPassword,
        user_role
      };
      await this._userRepository.saveUser(userDate)

      const hashedOtp = await this._encryptOtp.encrypt(otp);

      const otpdate: OtpData = await this._userRepository.saveOtp(
        email,
        hashedOtp,
      );

      await this._generateMail.sendMail(email, otp);



      return {
        status: 200,
        message: "Verification otp sent to your email",
        data: otpdate.email,
        _id: otpdate._id
      };
    } catch (error) {
      return {
        status: 404,
        message: "An error occurred",
      };
    }
  }

  deleteOtpData(id: string | ObjectId) {
    try {
      setTimeout(() => {
        this._userRepository.deleteOtp(id)
      }, 60000)
    } catch (error) {
      return {
        status: 404,
        message: "An error occurred",
      };
    }
    

  }

  async verify_otp(otp: string, email: string) {
    try {
      const response: string = await this._userRepository.checkExistOtp(email);

      if (response == 'Email does not exist.') {
        return {
          status: 400,
          message: response,
        };
      }
      if (response == 'User does not exist.') {
        return {
          status: 400,
          message: response,
        };
      }

      //console.log(response);
      

      const hashedOtp = await this._encryptOtp.compare(parseInt(otp),response);
      if(hashedOtp){
         
        return {
          status: 200,
          message: 'varification succussfull.',
        };

      }else{
        return {
          status: 400,
          message: 'OTP did not match.',
        };
      }
      

    } catch (error) { 
      return {
        status: 404,
        message: "An error occurred",
      };
    }

  }
  async createNewOtp(email:string){
    try {
      const otp = this._generateOtp.createOtp();

      const hashedOtp = await this._encryptOtp.encrypt(otp);

      const otpData: OtpData=await this._userRepository.saveOtp(
        email,
        hashedOtp,
      );
      await this._generateMail.sendMail(email, otp);


      return {
        status: 200,
        message: 'OTP has been successfully created. Please check your email.',
        email: otpData.email,
        _id: otpData._id
      };

    } catch (error) {
       return {
        status: 404,
        message: "An error occurred",
      };
    }
  }



}



export default UserUsecase;