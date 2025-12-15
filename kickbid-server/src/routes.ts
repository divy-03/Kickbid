import { Router } from "express";
import authRoutes from "./auth/auth.routes";

const routes = Router();

routes.get("/health", (_req, res) => {
  res.json({
    dateTime: new Date()
  })
});

routes.use("/auth", authRoutes);

export default routes;
