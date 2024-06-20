import { User } from "@prisma/client";
import db from "../lib/db";
import { ERROR_MESSAGE } from "../utils/constant/error";

export const createUser = async (body: User): Promise<User> => {
  return db.user.create({
    data: body,
  });
};

export const getSingleUser = async (condition: {
  [key: string]: string;
}): Promise<User | null> => {
  return db.user.findFirst({
    where: condition,
    include: {
      follower: {
        select: {
          followerId: true,
          followingId: true,
          following: {
            select: {
              id: true,
              fullname: true,
              profile: true,
            },
          },
          isFollow: true,
        },
      },
      following: {
        select: {
          follower: {
            select: {
              id: true,
              fullname: true,
              profile: true,
            },
          },
          followerId: true,
          followingId: true,
          isFollow: true,
        },
      },
      profile: true,
      threads: true,
    },
  });
};
export const getUserByName = async (
  fullname: string,
  loggedInUserId:string
): Promise<User[] | null> => {
  return await db.user.findMany({
    where: {
      fullname: {
        contains: fullname,
        mode: "insensitive",
      },
      id:{
        not:loggedInUserId
      }
    },
    include: {
      follower: {
        select: {
          follower: {},
        },
      },
      following: true,
      profile: true,
      threads: true,
    },
  });
};

export const updateUser = async (
  id: string,
  body: User
): Promise<User | Error> => {
  const existUser = await db.user.findFirst({
    where: {
      id,
    },
  });

  if (!existUser) {
    throw new Error("User tidak ditemukan!");
  }

  console.log(body);

  return db.user.update({
    where: {
      id,
    },
    data: body,
  });
};

export const deleteUser = async (id: string): Promise<string> => {
  const existUser = await db.user.findFirst({
    where: {
      id,
    },
  });

  if (!existUser) {
    throw new Error(ERROR_MESSAGE.DATA_NOT_FOUND);
  }

  await db.user.delete({
    where: {
      id,
    },
  });

  return "Sukses delete user dengan id " + id;
};

export const getSugestedUser = async (loggedInUserId: string) => {
  return await db.user.findMany({
    take: 5,
    where: {
      id: {
        not: loggedInUserId,
      },
      follower: {
        none: {
          followingId: loggedInUserId,
        },
      },
    },
    select: {
      id: true,
      fullname: true,
      email: true,
      password: true,
      profile: true,
    },
  });
};

//parameter  (condition: {[key: string]: string;}) berarti bisa menerima key berbeda beda dengan jenis string contoh diatas bisa menggunakan param id
