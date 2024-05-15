import * as replyService from"../services/replyService"
import { Request,Response } from "express";
import { errorHandler } from "../utils/errorHandler";

export const createReply = async (req:Request,res:Response) =>{
    try {
        const body = req.body
        body.userId = res.locals.userId
        const threadId = req.params.threadId
        body.threadId = threadId
        const files = req.files as {
            [fieldname: string]: Express.Multer.File[];
         };
   
        return res.status(200).json(replyService.createReply(body,files))
    } catch (error) {
        console.log(error);
        
        return errorHandler(error,res)
    }
}