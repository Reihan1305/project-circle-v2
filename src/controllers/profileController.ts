import * as profileService from "../services/profileService";
import { Request, Response } from "express";
import { errorHandler } from "../utils/errorHandler";
import cloudinary from "../config";
import fs from "fs";
import path from "path"; // Add this to handle file paths

export const updateProfile = async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const userId = res.locals.userId;
        const files = req.files as { [fieldname: string]: Express.Multer.File[] };

        // Ensure files are processed correctly
        const photoProfile = files?.photoProfile?.[0];
        const cover = files?.cover?.[0];

        if (photoProfile) {
            const photoProfilePath = path.resolve(photoProfile.path); // Ensure the path is correct
            const cloudUpload = await cloudinary.uploader.upload(photoProfilePath, {
                folder: "circle53"
            });
            fs.unlinkSync(photoProfilePath); // Use the correct path to delete the file
            body.photoProfile = cloudUpload.secure_url;
        }

        if (cover) {
            const coverPath = path.resolve(cover.path); // Ensure the path is correct
            const cloudUpload = await cloudinary.uploader.upload(coverPath, {
                folder: "circle53"
            });
            fs.unlinkSync(coverPath); // Use the correct path to delete the file
            body.cover = cloudUpload.secure_url;
        }

        await profileService.updateProfile(body, userId);
        return res.status(200).json({
            message: "Profile updated successfully",
            status: true
        });
    } catch (error) {
        console.error(error);
        return errorHandler(error, res);
    }
};
