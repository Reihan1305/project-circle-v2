import { Thread } from "@prisma/client";
import db from "../lib/db";

export const createReply = async (body: Thread,files: { [fieldname: string]: Express.Multer.File[] }) => {
   const reply = await db.thread.create({
      data: body
      ,
   });

   if (Array.from(files.image)) {
      await db.image.createMany({
         data: files.image.map((img) => ({
            imageUrl: img.filename,
            threadId: reply.id,
         })),
      });
   }

   return reply;
};