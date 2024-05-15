import db from "../lib/db";
import { ERROR_MESSAGE } from "../utils/constant/error";

export const like = async (threadId:string,userId:string) =>{
    const selectedThread =await db.thread.findFirst({
        where :{id:threadId},
        include:{
            like:true}
    })
    if(!selectedThread)throw new Error(ERROR_MESSAGE.DATA_NOT_FOUND)

    const existtingLike = await db.like.findFirst({
        where:{threadId:threadId,userId:userId}
    })

    if(existtingLike){
        return await db.like.delete({
            where:{threadId:threadId,userId:userId}
        })
    }
    return db.like.create({
        data:{
            threadId:threadId,
            userId:userId
        }
    })
}