import { Router } from "express";
import *as profileController from "../controllers/profileController"
import authentication from "../middlewares/authentication";
import uploadMiddleware from "../middlewares/uploads";

const profileRouter = Router()

profileRouter.put("/",authentication,uploadMiddleware(),profileController.updateProfile)

export default profileRouter