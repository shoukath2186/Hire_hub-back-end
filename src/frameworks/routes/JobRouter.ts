import express from "express";
import errorHandle from "../middlewares/errorHandle";
import multer from 'multer';

import JobController from '../../controller/jobController';
import JobUseCases from "../../usecase/jobUseCase";
import JobRepository from "../../repository/jobRepository";

import storage from "../middlewares/multer";

import Cloudinary from "../utils/cloudinary";


const jobRepository=new JobRepository()

const cloudinary=new Cloudinary()

const jobUseCase=new JobUseCases(
    jobRepository,
    cloudinary
)

const jobController=new JobController(jobUseCase)


const jobRouter=express.Router()


jobRouter.get('/allCalegory',(req,res,next)=>{

    jobController.getAllCategory(req,res,next)
    
})



const upload = multer({ storage: storage });

jobRouter.post('/addNewJob',upload.single('logo'),(req,res,next)=>{

    jobController.createJob(req,res,next)
    
})

jobRouter.use(errorHandle)
export default  jobRouter