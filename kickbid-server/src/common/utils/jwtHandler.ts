import { JWT_EXPIRES_IN, JWT_REFRESH_EXPIRES_IN, JWT_REFRESH_SECRET, JWT_SECRET } from "../config";
import jwt from "jsonwebtoken";

export const generateTokens = (payload: object) => {
  const accessToken = jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN
  })

  const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {
    expiresIn: JWT_REFRESH_EXPIRES_IN
  })

  return { accessToken, refreshToken };
}

export const getNewAccessToken = (payload: object) => {
  const accessToken = jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  })

  return accessToken;
}

export const validateAccessToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET) as { userId: string };
}

export const validateRefreshToken = (token: string) => {
  return jwt.verify(token, JWT_REFRESH_SECRET) as { userId: string };
}
