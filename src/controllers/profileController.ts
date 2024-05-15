import *as profileService from "../services/profileService";
import { Request,Response } from "express";
import { errorHandler } from "../utils/errorHandler";

export const updateProfile = async(req:Request,res:Response) => {
    try {
        const body = req.body
        const userId = res.locals.userId
        const files = req.files as {[fieldname :string]:Express.Multer.File[]}
        const photoProfile = files?.photoProfile[0]?.filename
        const cover = files?.cover[0]?.filename

        if(photoProfile){
            body.photoProfile = photoProfile
        }

        if(cover){
            body.cover = cover
        }

        await profileService.updateProfile(body,userId)
        return res.status(200).json({
            message:"success update",
            status:true
        })
    } catch (error) {
        console.log(error);
        return errorHandler(error, res)
    }
}