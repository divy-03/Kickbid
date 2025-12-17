import fetchUser from "@src/common/middlewares/fetchUser";
import { Router } from "express";
import { UserController } from "./user.controller";


const userRouter = Router();

// NOTE: Protected Router

userRouter.get("/all", fetchUser, UserController.getUsers);
userRouter.get("/profile", fetchUser, UserController.profile);


export default userRouter;
