import *as followService from "../services/followService"
import { Request,Response } from "express"

export const follow = async(req:Request,res:Response) =>{
    try {
        const followerId = req.params.followerId
        const followingId = res.locals.userId
        

        return res.status(200).json(await followService.follow(followerId,followingId))
    } catch (error) {
        
    }
}