import { Router } from "express";
import * as threadController from "../controllers/threadController"
import * as replyController from "../controllers/replyController"
import uploadMiddleware from "../middlewares/uploads";
import authentication from "../middlewares/authentication";

const threadRoute = Router();

//for thread
threadRoute.get("/:threadId", threadController.getThread);
threadRoute.get("/user/:userId", threadController.getThreadsByuserId);
threadRoute.get("/", threadController.getThreads);
threadRoute.post("/",authentication,uploadMiddleware(),threadController.createThreads);
threadRoute.put("/:threadId",authentication,uploadMiddleware(),threadController.updateThread);
threadRoute.delete("/:threadId",authentication,threadController.deleteThread);


//for reply
threadRoute.post("/reply/:threadId",authentication,uploadMiddleware(),replyController.createReply);
threadRoute.put("/reply/:replyId",authentication,uploadMiddleware(),replyController.updateReply);
threadRoute.delete("/reply/:replyId",authentication,replyController.deleteReply);

//for image
// threadRoute.get("/image",authentication,threadController.findAllImage)

export default threadRoute;