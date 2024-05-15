import { Request, Response } from "express";
import * as threadService from "../services/threadService";
import { errorHandler } from "../utils/errorHandler";
import { threadId } from "worker_threads";

export const getThread = async (req: Request, res: Response) => {
   try {
      const threadId = req.params.threadId;
      res.status(200).json(await threadService.getThread(threadId));
   } catch (error) {
      console.log(error);

      errorHandler(error, res);
   }
};

export const getThreads = async (req: Request, res: Response) => {
   try {
      res.status(200).json(await threadService.getThreads());
   } catch (error) {
      console.log(error);

      errorHandler(error, res);
   }
};

export const createThreads = async (req: Request, res: Response) => {
   try {
      console.log(res.locals.userId);

      const body = req.body;
      body.userId = res.locals.userId;

      const files = req.files as {
         [fieldname: string]: Express.Multer.File[];
      };

      res.status(200).json(await threadService.insertThread(body, files));
   } catch (error) {
      console.log(error);

      errorHandler(error, res);
   }
};

export const deleteThread = async(req:Request,res:Response) =>{
   try {
   const threadId = req.params.threadId
   const userId = res.locals.userId

   res.status(201).json(await threadService.deletethread(threadId,userId))
   
   } catch (error) {
    console.log(error);
    return errorHandler(error,res)
      
   }
}