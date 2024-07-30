import express from 'express'

import UserController from "../../controller/userController";
import UserUsecase from "../../usecase/userUseCases";
import UserRepository from '../../repository/userRepository'

import GenerateOtp from '../utils/generateOtp';
import EncryptOtp from '../utils/bcryptOtp';
import EncryptPassword from "../utils/bcryptPassword";
import sendOtp from '../utils/sentMail';
import JWTToken from '../utils/generateToken';
import errorHandle from "../middlewares/errorHandle";


const userRouter = express.Router();

//services
const generateOtp = new GenerateOtp();
const ecryptPassword = new EncryptPassword();
const encryptOtp = new EncryptOtp();
const generateMail = new sendOtp();
const jwtToken = new JWTToken();


//repositories
const userRepository = new UserRepository();

//useCases
const userCase = new UserUsecase(
    userRepository,
    generateOtp,
    ecryptPassword,
    encryptOtp,
    generateMail,
    jwtToken,
  );

  //controllers
const userController = new UserController(userCase);


userRouter.post("/signup", async (req, res, next) => {
    await setTimeout(()=>{
      userController.signUp(req, res, next);
    },2000)
});


userRouter.post("/verify-otp", async (req, res, next) => {
    
    userController.verification(req,res, next);
});


userRouter.post("/resendOtp", async (req, res, next) => { 

    
    userController.resendOtp(req,res, next);
    
});





userRouter.use(errorHandle);

export default userRouter;



