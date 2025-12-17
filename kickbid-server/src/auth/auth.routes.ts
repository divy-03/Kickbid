import { Router } from "express";
import { AuthController } from "./auth.controller";
import { validate } from "@src/common/middlewares/validate";
import { LoginSchema, RegisterSchema } from "./auth.schema";

const authRoutes = Router();

authRoutes.post(
  "/register", validate(RegisterSchema), AuthController.register
);

authRoutes.post(
  "/login", validate(LoginSchema), AuthController.login
);

export default authRoutes;

