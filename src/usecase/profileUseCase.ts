
import { Request } from "express";
import ProfileRepository from "../repository/profileRepository"
import { ObjectId } from "mongoose";
import Cloudinary from "../frameworks/utils/cloudinary";
import EncryptPassword from "../frameworks/utils/bcryptPassword";

interface CustomRequest extends Request {
    user?: string | ObjectId;
}

class ProfileUseCase {
    private _profileRepository: ProfileRepository;
    private _cloudinary: Cloudinary
    private _ecryptPassword: EncryptPassword
    constructor(
        profileRepository: ProfileRepository,
        cloudinary: Cloudinary,
        ecryptPassword: EncryptPassword
    ) {
        this._profileRepository = profileRepository
        this._cloudinary = cloudinary
        this._ecryptPassword = ecryptPassword
    }

    async createProfile(req: CustomRequest) {
        try {
            const user: any = req.user

            const ProfileData = await this._profileRepository.createUserProfile(user);

            if (ProfileData) {
                return {
                    status: 200,
                    data: ProfileData
                }
            } else {
                return {
                    status: 400,
                    data: 'Porfile is not found'
                }
            }
        } catch (error) {
            return {
                status: 404,
                message: "An error occurred",
            };
        }
    }
    async getProfile(req: CustomRequest) {
        try {

            if (req.user) {



                const ProfileData = await this._profileRepository.findUserJobProfile(req.user);

                if (ProfileData) {
                    return {
                        status: 200,
                        data: ProfileData
                    }

                }
                return {
                    status: 400,
                    data: 'Porfile is not found'
                }

            } else {
                return {
                    status: 400,
                    data: 'User not found'
                }
            }

        } catch (error) {
            return {
                status: 404,
                message: "An error occurred",
            };
        }
    }
    async updateJobProfile(req: CustomRequest, file: any, Id: string | ObjectId) {
        try {

            let Url: string = ''
            if (file) {

                const oldResume = await this._profileRepository.getResume(Id);
                // console.log(oldResume);

                if (oldResume) {
                    let a = await this._cloudinary.removeCloudinary(oldResume);
                    // console.log(a);

                }

                Url = await this._cloudinary.saveCloudinaryResume(file);
                // console.log(12345, Url);

            }



            const updateData = await this._profileRepository.updateJobProfile(req, Id, Url);

            if (updateData) {
                return {
                    status: 200,
                    data: updateData
                }
            }
            return {
                status: 400,
                data: 'Update failed: Unable to complete the update operation. Please try again later'
            }

        } catch (error) {
            return {
                status: 404,
                message: "An error occurred",
            };
        }
    }
    async updateMainProfile(userId: string | ObjectId, userData: any, file: any) {
        try {
            let password = ''
            if (userData.newPassword && userData.previousPassword) {
                password = await this._ecryptPassword.encrypt(userData.newPassword);
            }
            
            

            let imageUrl: any = ''

            if (file) {

                const getOldProfile = await this._profileRepository.getProfile(userId)
                await this._cloudinary.removeCloudinary(getOldProfile);
                imageUrl = await this._cloudinary.saveCloudinary(file);

            }

            const Data = await this._profileRepository.updateProfile(userId, userData, imageUrl,password);

             if(Data){
                return {
                    status: 200,
                    data: Data
                }
             }else{
                return {
                    status: 400,
                    data: 'Update failed: Unable to complete the update operation.'
                }
             }
            

        } catch (error) {
            return {
                status: 404,
                message: "An error occurred",
            };
        }
    }
    async getAplication(userId:string|ObjectId){
        try {
            const aplications=await this._profileRepository.getAplication(userId);

            if(aplications){
                return {
                    status: 200,
                    data: aplications
                }
            }
            return {
                status: 400,
                data: 'fot foud aplication'
            }
            
        } catch (error) {
            return {
                status: 404,
                message: "An error occurred",
            };
        }
    }

}

export default ProfileUseCase