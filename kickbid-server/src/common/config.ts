import { env } from "@common/utils/env";
import { SignOptions } from "jsonwebtoken";

export const INTERNAL_SERVER_ERROR = "Internal Server Error";

export const BCRYPT_SALT_ROUNDS = parseInt(env("BCRYPT_SALT_ROUNDS")) || 10;

export const JWT_SECRET = env("JWT_SECRET") || "my_secret_key";
export const JWT_EXPIRES_IN = env("JWT_EXPIRES_IN") as SignOptions["expiresIn"];

export const JWT_REFRESH_SECRET = env("JWT_REFRESH_SECRET") || "my_refresh_key";
export const JWT_REFRESH_EXPIRES_IN = (env("JWT_REFRESH_EXPIRES_IN") || "7d") as SignOptions["expiresIn"];

export const USE_SECURE_COOKIE = env("USE_SECURE_COOKIE") || true;
