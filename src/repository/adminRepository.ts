
import AdminRepo from "../usecase/interfaces/admin/IAdminRepo";
import UserModel from "../frameworks/models/userModel"; 
import AdminModel from "../frameworks/models/admin";
import CategoryModal from "../frameworks/models/categoryModel";
import { AdminData } from "../usecase/interfaces/admin/IAdminData";


class AdminRepository implements AdminRepo{

   async findAdmin(email: string) {
          const adminData=await AdminModel.findOne({email:email}); 

          if(adminData){
            return adminData
          }
          return 'Email is not exist.'
          
         
    };
    async findAllUsers(){
      try {

        const users=await UserModel.find({},{_id:1,last_name:1,user_name:1,user_role:1,email:1,phone: 1,profilePicture:1,isBlocked:1,createdAt:1}).sort({ _id: -1 });

        return users


      } catch (error) {
        console.error('Error find in admin Repository', error);
        throw error; 
      }
    }
      
    

  async findAndBlock(id:string){
    try {
      const user = await UserModel.findById(id);
     
     const res= await UserModel.findByIdAndUpdate(
        id,
        { $set: { isBlocked: !user?.isBlocked } } 
      );

     return res
     
      
    } catch (error) {
      console.error('Error find in admin Repository', error);
      throw error; 
    }
  }
  async findAdminbyId(id:string){
    try {
      const admin:AdminData|null=await AdminModel.findById(id,{id:1,email:1})

      return admin;
      
    } catch (error) {
      console.error('Error find in admin Repository', error);
      throw error; 
    }
  }
  async saveCategory(name:string){

    try {
      const newCategory=new CategoryModal({name:name})

      const category=await newCategory.save()

      return category      
      
    } catch (error) {
      console.error('Error find in admin Repository', error);
      throw error; 
    }
         
  }
  async getCategory(){
    try {

      const allData=await CategoryModal.find({},{_id:1,name:1,is_block:1}).sort({_id:-1})

      return allData;
      
      
    } catch (error) {
      console.error('Error find in admin Repository', error);
      throw error; 
      
    }
  }
  async blockCategory(id:string){
     try {

      const category = await CategoryModal.findById(id);

      if(category){
         await CategoryModal.updateOne({_id:id},{$set:{is_block:!category.is_block}})
         return 'success'
      }

      return 'faild'
      
     } catch (error) {
      console.error('Error find in admin Repository', error);
      throw error; 
     }
  }

}

export default AdminRepository;