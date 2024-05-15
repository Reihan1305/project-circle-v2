import * as userService from "./userService";
import { User } from "@prisma/client";
import schemaRegister from "../lib/validation/registerValidation";
import { ERROR_MESSAGE } from "../utils/constant/error";
import bcrypt from "bcrypt";
import loginSchema from "../lib/validation/loginValidation";
import jwt from "jsonwebtoken";

const register = async (body: User): Promise<{ id: string }> => {
   // 1. validate user
   const { error, value } = schemaRegister.validate(body);
   if (error?.details) {
      console.log(error);

      throw new Error(ERROR_MESSAGE.WRONG_INPUT);
   }

   // 2. check existing email
   const existEmail = await userService.getSingleUser({
      email: value.email,
   });

   if (existEmail) {
      throw new Error(ERROR_MESSAGE.EXISTED_DATA);
   }

   // 3. hash password
   const hashedPassword = await bcrypt.hash(value.password, 10);

   const user = await userService.insertUser({
      ...value,
      password: hashedPassword,
   });

   return { id: user.id };
};

const login = async (body: User): Promise<{ token: string }> => {
   // 1. validate input
   const { error, value } = loginSchema.validate(body);

   if (error?.details) {
      console.log(error);

      throw new Error(ERROR_MESSAGE.WRONG_INPUT);
   }

   // 2. check existing email
   const existEmail = await userService.getSingleUser({
      email: value.email,
   });

   if (!existEmail) {
      throw new Error(ERROR_MESSAGE.DATA_NOT_FOUND);
   }

   // 3. check password
   const isMatch = await bcrypt.compare(value.password, existEmail.password);
   if (!isMatch) {
      throw new Error(ERROR_MESSAGE.DATA_NOT_FOUND);
   }

   const token = jwt.sign(existEmail, process.env.SECRET_KEY!, {
      expiresIn: "1d",
   });

   return { token };
};

export { register, login };
