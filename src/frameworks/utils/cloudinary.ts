

import cloudinary from '../utils/jobConfig/cloudinary';


class Cloudinary{

   async saveCloudinary(file:any){

    try {
        
        const result = await cloudinary.uploader.upload(file.path, {
            folder: 'uploads', 
            allowed_formats: ['jpg', 'png', 'jpeg'],
          });
    
          return result.secure_url;
        
    } catch (error) {
        console.error('Error uploading file to Cloudinary:', error);
      throw new Error('Error uploading file to Cloudinary');
    }
      
       
   }

}

export default Cloudinary;