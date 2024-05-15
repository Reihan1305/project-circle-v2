import { Thread } from "@prisma/client";
import db from "../lib/db";
import { ERROR_MESSAGE } from "../utils/constant/error";

export const insertThread = async (
   body: Thread,
   files: { [fieldname: string]: Express.Multer.File[] }
) => {
   const thread = await db.thread.create({
      data: body,
   });

   if (Array.from(files.image)) {
      await db.image.createMany({
         data: files.image.map((img) => ({
            imageUrl: img.filename,
            threadId: thread.id,
         })),
      });
   }

   return thread;
};

export const getThread = async (id: string) => {
   return await db.thread.findFirst({
      where: {
         id,
      },
      include: {
         author: {
            select: {
               id: true,
               fullname: true,
            },
         },
         images: {
            select: {
               imageUrl: true,
            },
         },
         like:true,
         reply:true
      },
   });
};

export const getThreads = async () => {
   return await db.thread.findMany({
      include: {
         author: {
            select: {
               id: true,
               fullname: true,
            },
         },
         images: {
            select: {
               imageUrl: true,
            },
         },
         like:true,
         reply:true
      },
   });
};

export const deletethread = async (threadId :string , userId :string)=>{
   const thread =await db.thread.findFirst({
      where:{id:threadId}
   })

   if(!thread){
      throw new Error(ERROR_MESSAGE.DATA_NOT_FOUND)
   }

   if(thread?.userId !== userId){
      throw new Error ("your not the author")
   }
   const deleteThread = await db.thread.delete({
      where:{id:threadId}
   })
   return {message:"delete succes", deleteThread}
}