import { Thread } from "@prisma/client";
import db from "../lib/db";
import { ERROR_MESSAGE } from "../utils/constant/error";

export const createReply = async (body: Thread, files: { [fieldname: string]: Express.Multer.File[] }) => {
   const reply = await db.thread.create({
      data: body,
   });

   

   if (files.image) {
      await db.image.createMany({
         data: files.image.map((img) => ({
            imageUrl: img.filename,
            threadId: reply.id,
         })),
      });
   }

   return reply;
};

export const deleteReply = async (replyId :string , userId :string)=>{
   const thread =await db.thread.findFirst({
      where:{id:replyId}
   })

   if(!thread){
      throw new Error(ERROR_MESSAGE.DATA_NOT_FOUND)
   }

   if(thread?.userId !== userId){
      throw new Error ("your not the author")
   }
   const deleteReply = await db.thread.delete({
      where:{id:replyId}
   })
   return {message:"delete succes", deleteReply}
}

export const updateReply = async(id :string, body: Thread,files: { [fieldname: string]: Express.Multer.File[] }) =>{
   const checkReply = await db.thread.findFirst({
      where:{id}
   })

   if(!checkReply){
      throw new Error (ERROR_MESSAGE.DATA_NOT_FOUND)
   }

   const updateReply = await db.thread.update({
      where:{id},
      data:body
   })

   const checkImage = await db.image.findMany({
      where:{
         threadId:id
      }
   })

   if(!checkImage){
      return updateReply
   }

   
   if(files.image){
      await db.image.deleteMany({
         where:{threadId:id}
      })
      await db.image.createMany({
         data: files.image.map((img) => ({
            imageUrl: img.filename,
            threadId: id,
         })),
      });
   }

   return updateReply
}