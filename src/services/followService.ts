
import db from "../lib/db";

export const follow = async (followerId: string, followingId: string) => {
   const existingFollow = await db.follow.findFirst({
      where: {
         followerId,
         followingId,
      },
   });

   if (existingFollow) {
      await db.follow.deleteMany({
         where: {
            followerId,
            followingId,
         },
      });

      return "unfollowing successful";
   }

   const follow = await db.follow.create({
      data: {
         followerId,
         followingId,
      },
   });

   return "following successful";
};
