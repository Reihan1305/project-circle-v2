import { Request, Response } from "express";
import * as userService from "../services/userService";
import { errorHandler } from "../utils/errorHandler";
import { Console } from "console";

export const getSingleUser = async (req: Request, res: Response) => {
   try {
      const id = req.params.userId;

      const dataUser = await userService.getSingleUser({id});

      res.status(200).json(dataUser);
   } catch (error) {
      console.log(error);

      const err = error as unknown as Error;

      res.status(500).json({
         message: err.message,
      });
   }
};

export const getLoginUser = async (req: Request, res: Response) => {
   try {
      const id = res.locals.userId;

      const dataUser = await userService.getSingleUser({id});

      res.status(200).json(dataUser);
   } catch (error) {
      console.log(error);

      const err = error as unknown as Error;

      res.status(500).json({
         message: err.message,
      });
   }
};

export const getSugestedUser = async(req:Request,res:Response) =>{
   try {
      const userId = res.locals.userId
      return res.status(200).json(await userService.getSugestedUser(userId))

   } catch (error) {

      const err = error as unknown as Error;

      return res.status(500).json({
         message:err.message
      })
   }
}


export const getUserByName = async(req:Request,res:Response) => {
   try {
      const userId = res.locals.userId
      const fullname = req.params.name;

      const dataUser = await userService.getUserByName(fullname,userId);

      res.status(200).json(dataUser);
   } catch (error) {
      console.log(error);

      const err = error as unknown as Error;

      res.status(500).json({
         message: err.message,
      });
   }
}

export const createUser = async (req: Request, res: Response) => {
   try {
      const { body } = req;

      const dataInsertUser = await userService.createUser(body);

      res.status(200).json(dataInsertUser);
   } catch (error) {
      console.log(error);

      const err = error as unknown as Error;

      res.status(500).json({
         message: err.message,
      });
   }
};

export const deleteUser = async (req: Request, res: Response) => {
   try {
      const userId =res.locals.userId

      const messageDeleteUser = await userService.deleteUser(userId);

      res.status(200).json({ message: messageDeleteUser });
   } catch (error) {
      console.log(error);

      return errorHandler(error, res);
   }
};

export const updateUser = async (req: Request, res: Response) => {
   try {
      const { body } = req
      const userId = res.locals.userId

      const dataUpdateUser = await userService.updateUser(userId, body);

      res.status(200).json(dataUpdateUser);
   } catch (error) {
      console.log(error);

      const err = error as unknown as Error;

      res.status(500).json({
         message: err.message,
      });
   }
};
