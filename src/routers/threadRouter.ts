import { Router } from "express";
import * as threadController from "../controllers/threadController"
import * as replyController from "../controllers/replyController"
import uploadMiddleware from "../middlewares/uploads";
import authentication from "../middlewares/authentication";

const threadRoute = Router();

threadRoute.get("/:threadId", threadController.getThread);
threadRoute.get("/", threadController.getThreads);
threadRoute.post("/",authentication,uploadMiddleware(),threadController.createThreads);
threadRoute.delete("/:threadId",authentication,threadController.deleteThread);
threadRoute.post("/reply/:threadId",authentication,uploadMiddleware(),replyController.createReply);
export default threadRoute;