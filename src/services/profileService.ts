import { response } from "express";
import db from "../lib/db";
import { IProfile } from "../types/app";

export const updateProfile = async(body:IProfile,userId:string) =>{
    const update = await db.userProfile.update({
        where:{userId:userId},
        data:{...body}
    })

    return update
}