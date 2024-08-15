import User from "../entities/user";
import AdminRepository from "../repository/adminRepository";
import EncryptPassword from "../frameworks/utils/bcryptPassword";
import IAdmin from "../entities/IAdmin";
import JWTToken from "../frameworks/utils/generateToken";
import { stringify } from "querystring";

import { AdminData } from "./interfaces/admin/IAdminData";
import { ICategory } from "../entities/iCategory";
import { ObjectId } from "mongoose";



class AdminUseCase{
  
     private _adminRepository:AdminRepository
     private _encryptPassword:EncryptPassword
     private _jwtToken: JWTToken;


     constructor(
        adminRepository:AdminRepository,
        encryptPassword:EncryptPassword,
        jwtToken:JWTToken,
    ){
       this._adminRepository=adminRepository,
       this._encryptPassword=encryptPassword
       this._jwtToken = jwtToken;
     }
     
     async matchingAdmin(email:string,password:string){
         try {
            
             
             const adminData= await this._adminRepository.findAdmin(email);

             if(adminData=='Email is not exist.'){
               return {
                  status: 400,
                  message: adminData,
                };
             }

              const encrypt:Boolean=await this._encryptPassword.compare(password,adminData.password);
              if(encrypt){
               return adminData
               

              }
              return {
               status: 400,
               message: 'The password you entered is incorrect. Please try again.',
             };
            
         } catch (error) {
            return {
                status: 404,
                message: "An error occurred",
              };
         }
     }
     async createToken(adminId:string,email:string) {

          try {
   
            const admin:AdminData={_id:adminId,email:email}

            const accessToken= this._jwtToken.accessToken(admin);
            const refreshToken= this._jwtToken.refreshToken(admin); 

            return {
               accessToken,
               refreshToken
            }
            
          } catch (error) {
            return {
               status: 404,
               message: "An error occurred",
             };
          } 
          
     }
     async takeAllUser(){
      try {
        
        const findUsers=await this._adminRepository.findAllUsers() 

        return findUsers

      } catch (error) {
        return {
          status: 404,
          message: "An error occurred",
        };
      }
     }

     async blockUser(id:any){
      try {

        let res= await this._adminRepository.findAndBlock(id); 

        if(res){
          const findUsers=await this._adminRepository.findAllUsers() 

        return findUsers
        }
        return {
          status: 400,
          message: "An error occurred",
        };
        
      } catch (error) {
        return {
          status: 404,
          message: "An error occurred",
        };
      }
     }
     async addCategory(name:string){
         try {
      
           const newcategory= await this._adminRepository.saveCategory(name);
            
           if(newcategory){

            const allCategoryData= await this._adminRepository.getCategory();
         
            if(allCategoryData){
              return {
                status: 200,
                data: allCategoryData  
              };
    
            }

            return{
              status: 400,
              message: "An error occurred",
            }
              
           };
           return {
            status: 400,
            message: "An error occurred",
          };
            
         } catch (error) {
          return {
            status: 404,
            message: "An error occurred",
          };
         }
     }
  

     async allCategory(){
      try {
      
        const allCategoryData:any= await this._adminRepository.getCategory();

      
        // console.log(234,allCategoryData); 
        
         
        if(allCategoryData){
          return {
            status: 200,
            data: allCategoryData  
          };

        }
        return{
          status: 400,
          message: "An error occurred",
        }
        
         
      } catch (error) {
       return {
         status: 404,
         message: "An error occurred",
       };
      }
     }

     async blockCategory(id:any){
      
      try {
        
      const res=await this._adminRepository.blockCategory(id);
      if(res=='success'){
        const allCategoryData= await this._adminRepository.getCategory();
         
        if(allCategoryData){
          return {
            status: 200,
            data: allCategoryData  
          };

        }

        return{
          status: 400,
          message: "An error occurred",
        }
          
      }else{
        return{
          status: 400,
          message: "An error occurred",
        }
      }

   
      } catch (error) {
        return {
          status: 404,
          message: "An error occurred",
        };
      }

     }

}

export default AdminUseCase;