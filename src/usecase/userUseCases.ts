
import User from "../entities/user";
import EncryptOtp from "../frameworks/utils/bcryptOtp";
import EncryptPassword from "../frameworks/utils/bcryptPassword";
// import cloudinary from "../frameworks/utils/cloudinaryConfig";
import GenerateOtp from "../frameworks/utils/generateOtp";
import JWTToken from "../frameworks/utils/generateToken";
import sendOtp from "../frameworks/utils/sentMail";
import UserRepository from "../repository/userRepository";

class UserUsecase{
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
      
}



export default UserUsecase;