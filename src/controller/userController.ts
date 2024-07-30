import { NextFunction, Request, response, Response } from "express";
import UserUsecase from "../usecase/userUseCases";
import dotenv from "dotenv";
dotenv.config();

class UserController{

    private _userUsecase: UserUsecase;

    constructor(userUsecase: UserUsecase) {
        this._userUsecase = userUsecase;
      }

      async signUp(req: Request, res: Response, next: NextFunction) {
        try {
          
          
          const verifyUser = await this._userUsecase.checkExist(req.body.email);

           
          if (verifyUser.status === 200){
            const user = await this._userUsecase.signup(
              req.body.userName,
              req.body.lastName,
              req.body.phone,
              req.body.email, 
              req.body.password,
              req.body.userRole
            );
            //console.log(23456,user); 

            if (user._id){
              this._userUsecase.deleteOtpData(user._id);
            } 
            
            return res.status(user.status).json({response:{message:user.message,data:user.data}});
          } else {
            return res.status(verifyUser.status).json(verifyUser.message);
          }
        } catch (error) {
          next(error);
        }
      }


      async verification(req: Request, res: Response, next: NextFunction){
        try {

          
          const response=await this._userUsecase.verify_otp(req.body.otp,req.body.email);
          

          return res.status(response.status).json(response.message);
          

        } catch (error) {
          next(error);
        }
         
         
      }


      async resendOtp(req: Request, res: Response, next: NextFunction){
        try {
          const response=await this._userUsecase.createNewOtp(req.body.email);
         // console.log(response);
          

          if (response._id){
            this._userUsecase.deleteOtpData(response._id);
          } 

          return res.status(response.status).json(response.message);

          
    
        } catch (error) {
          next(error);
        }
      
      }
}

export default UserController