import JobRepository from "../repository/jobRepository"
import {Request} from "express";
import Cloudinary from "../frameworks/utils/cloudinary";

interface NewJobRequestBody {
  companyName: string;
  contact: string;
  location: string;
  salary: string; // or number if you parse it later
  title: string;
  type: string;
  description: string;
  category: string;
  skill: string[];
}

class JobUseCases{

  private _jobRepository:JobRepository
  private _cloudinary:Cloudinary
  constructor(

    jobRepository:JobRepository,
    cloudinary:Cloudinary

  ){

    this._jobRepository=jobRepository,
    this._cloudinary=cloudinary
  }
  
  async allCategory(){
    try {
       
      const allData=await this._jobRepository.findCategory()

      if(allData=='faild'){

        return{
          status: 400,
          message: 'faild Category fetching',
        }
       
      }
      return{
        status: 200,
        data: allData
      }


    } catch (error) {
      return {
        status: 400,
        message: "An error occurred",
      };
    }
  } 

  async newJob(req:Request<{}, {}, NewJobRequestBody>){
    try {
      
      console.log(req.body);
      
      const LogoUrl:string=await this._cloudinary.saveCloudinary(req.file)
      
      const {companyName,contact,location,salary,title,type,description, category,skill} = req.body;

      const savedata=await this._jobRepository.saveJob(companyName,contact,location,salary,title,type,description, category,skill,LogoUrl)
      
      
      
    } catch (error) {
      return {
        status: 400,
        message: "An error occurred",
      };
    }
  }

}

export default JobUseCases