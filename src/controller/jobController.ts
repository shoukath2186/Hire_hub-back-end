import { NextFunction, Request, Response } from "express";
import JobUseCases from "../usecase/jobUseCase"

class JobController{
   private _jobUseCase:JobUseCases
constructor(
    jobUseCase:JobUseCases
){
    this._jobUseCase=jobUseCase
}

async getAllCategory(req: Request, res: Response, next: NextFunction){

    try {
        const category=await this._jobUseCase.allCategory()

        if(category.status==200){
            res.status(200).json(category.data)
            return
        }
        res.status(category.status).json(category.message)   
        
    } catch (error) {
        next(error)
    }
    

}
async createJob(req: Request, res: Response, next: NextFunction){
    try {
      
        const save=await this._jobUseCase.newJob(req);



        
    } catch (error) {
        next(error)
    }

}




}

export default JobController