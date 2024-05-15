import db from "../lib/db";

export const follow = async(followingId:string,followerId:string) =>{
    if(followingId === followerId){
        throw new Error("you cant follow your self")
    }

    const followingUser = await db.user.findUnique({
        where:{id:followingId}
    })

    if(!followingUser){
        throw new Error("user not found")
    }

    const followerUser = await db.user.findUnique({
        where:{id:followerId}
    })

    if(!followerUser){
        throw new Error("user not found")
    }

    const existingFollow = await db.follow.findFirst({
        where:{followerId:followerId,
                followingId:followingId
        }
    })

    if(existingFollow){
        const deleteFollow =await db.follow.delete({
            where:{followerId_followingId:existingFollow}
        })
        return {deleteFollow,message:"unfollow success"}
    }

    const follow = await db.follow.create({
        data:{
            followerId:followerId,
            followingId:followingId
        }
    })

    return {follow, message:"follow successfull"}
}