import { Router } from "express";
import { AuthController } from "./auth.controller";
import { validate } from "@src/common/middlewares/validate";
import { RegisterSchema } from "./auth.schema";

const authRoutes = Router();

authRoutes.post(
  "/register", validate(RegisterSchema), AuthController.register
);

export default authRoutes;

