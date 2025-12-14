import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "@common/errors/ApiError";
import { logger } from "@common/utils/logger";

function errorHandler(
  error: Error | ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (error instanceof ApiError) {
    return res.status(error.StatusCode).json({
      success: false,
      errorMessage: error.message,
      errors: error.errors,
    });
  }

  logger.error(`Unexpected Error: ${error.message}`);

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    errorMessage: error.message || "Internal Server Error",
  });
}

export default errorHandler;
