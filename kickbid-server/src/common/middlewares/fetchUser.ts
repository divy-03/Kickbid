import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { ResApi } from "../utils/resApi";
import { validateAccessToken } from "../utils/jwtHandler";
import { logger } from "../utils/logger";
import type { TokenPayload } from "../utils/jwtHandler";

const fetchUser = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const isBearerToken = authHeader?.startsWith("Bearer ");

  if (!authHeader || !isBearerToken) {
    const { status, message } = ResApi.error("Token not found");

    return res.status(status).json({ message });
  }

  const token: string = authHeader?.split(" ")[1] || "";

  try {
    const decoded = validateAccessToken(token) as TokenPayload;

    req.user = decoded;
    next();
  } catch (err) {
    const { status, message, data } = ResApi.error("Invalid or Expired token", StatusCodes.UNAUTHORIZED, err);
    logger.error(`Authentication Failed:  ${message}`);
    console.error("Authentication Failed: ", err);

    return res.status(status).json({
      message, error: data
    })
  }
}

export default fetchUser;
