import { Router } from "express";

const routes = Router();

routes.get("/health", (_req, res) => {
  res.json({
    dateTime: new Date()
  })
});

export default routes;
