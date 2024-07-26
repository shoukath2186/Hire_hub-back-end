import { NextFunction, Request, Response } from "express";
import UserUsecase from "../usecase/userUseCases";
import dotenv from "dotenv";
dotenv.config();

class UserController{
    
    private _userUsecase: UserUsecase;

    constructor(userUsecase: UserUsecase) {
        this._userUsecase = userUsecase;
      }
}

export default UserController