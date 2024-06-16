import { Router } from "express";
import * as userController from "../controllers/userController";
import authentication from "../middlewares/authentication";

const userRouter = Router();

// Define more specific routes before less specific ones
userRouter.get("/login", authentication, userController.getLoginUser);
userRouter.get("/suggested", authentication, userController.getSugestedUser); // This line is moved up
userRouter.get("/", authentication, userController.getSugestedUser); // This line is moved up
userRouter.get("/name/:name", authentication, userController.getUserByName);
userRouter.get("/:userId", authentication, userController.getSingleUser);
userRouter.post("/", userController.createUser);
userRouter.delete("/", authentication, userController.deleteUser);
userRouter.put("/", authentication, userController.updateUser);

export default userRouter;
