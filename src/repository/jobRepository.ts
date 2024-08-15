
import CategoryModal from "../frameworks/models/categoryModel";

class JobRepository{

    async findCategory(){
       const allCalegory=await CategoryModal.find({},{_id:1,name:1})
       if(allCalegory){
        return allCalegory
       }
       return 'faild'
       
    }
    async saveJob(companyName:string,contact:string,location:string,salary:string,title:string,type:string,description:string, category:string,skill:string[],LogoUrl:string){

        try {

            
            
        } catch (error) {
            console.log('error in for repository',error);
        }

    }

}


export default JobRepository