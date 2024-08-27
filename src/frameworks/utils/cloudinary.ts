import cloudinary from '../utils/jobConfig/cloudinary';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

class Cloudinary {
  async saveCloudinary(file: any) {
    try {
    
      const processedImagePath = path.join(__dirname, 'processed_image.jpg');

      await sharp(file.path)
        .resize(800, 800) 
        .toFormat('jpeg')
        .toFile(processedImagePath);

      
      const result = await cloudinary.uploader.upload(processedImagePath, {
        folder: 'uploads',
        allowed_formats: ['jpg', 'png', 'jpeg'],
      });

     
      fs.unlinkSync(processedImagePath);

      return result.secure_url;
    } catch (error) {
      console.error('Error uploading file to Cloudinary:', error);
      throw new Error('Error uploading file to Cloudinary');
    }
  }

  async saveCloudinaryResume(file: any) {
  
    try {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'uploads/resumes',
        resource_type: 'raw',
        allowed_formats: ['pdf', 'doc', 'docx'],
      });
  
      fs.unlinkSync(file.path);

      return result.secure_url;
    } catch (error) {
      console.error('Error uploading resume file to Cloudinary:', error);
      throw new Error('Error uploading resume file to Cloudinary');
    }
  }
  

  async removeCloudinary(imageUrl: any) {
    try {
     
      const publicId = imageUrl.split('/').slice(-2).join('/').split('.')[0]; // Extracts 'uploads/k02fs4bolumhl7cyzz0b'
      const result = await cloudinary.uploader.destroy(publicId);
  
    
  
      if (result.result === 'ok') {
        return true;
      } else {
        console.error('Failed to remove file from Cloudinary:', result);
        return false;
      }
    } catch (error) {
      console.error('Error removing file from Cloudinary:', error);
      throw new Error('Error removing file from Cloudinary');
    }
  }
}

export default Cloudinary;
