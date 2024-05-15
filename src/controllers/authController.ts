import { Request, Response } from "express";
import * as authService from "../services/authService";
import { errorHandler } from "../utils/errorHandler";
import { User } from "@prisma/client";

export const register = async (req: Request, res: Response) => {
   try {
      const dataRegister = await authService.register(req.body as User);
      res.status(200).json(dataRegister);
   } catch (error) {
      console.log(error);

      return errorHandler(error, res);
   }
};

export const login = async (req: Request, res: Response) => {
   try {
      const dataLogin = await authService.login(req.body as User);
      res.status(200).json(dataLogin);
   } catch (error) {
      console.log(error);

      return errorHandler(error, res);
   }
};
