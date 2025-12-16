import { Router } from "express";
import authRoutes from "./auth/auth.routes";
import userRouter from "./users/user.routes";

const routes = Router();

routes.get("/health", (_req, res) => {
  res.json({
    dateTime: new Date()
  })
});

routes.use("/auth", authRoutes);
routes.use("/user", userRouter);

export default routes;
